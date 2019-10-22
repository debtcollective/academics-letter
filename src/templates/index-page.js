import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { trackEvent } from "../lib/amplitude";

import {
  Hero,
  Layout,
  Letter,
  ReadProgress,
  SignModal,
  Signers,
} from "../components";

// Required for Netlify Forms to work correctly
const SignHiddenForm = () => (
  <form
    name="letter-form"
    data-netlify="true"
    data-netlify-honeypot="__bf"
    data-netlify-recaptcha="true"
    hidden
  >
    <input type="hidden" name="form-name" value="letter-form" />
    <input type="text" name="__bf" style={{ display: "none" }} />
    <input
      name="name"
      placeholder="Enter full name"
      type="text"
      required={true}
      className="form-control"
    />
    <input
      name="email"
      placeholder="Enter email"
      type="email"
      required={true}
      className="form-control"
    />
    <input
      name="college"
      placeholder="Enter college name"
      type="text"
      required={true}
      className="form-control"
    />
    <button type="submit" className="mt-2 mt-lg-3 btn-lg btn btn-primary">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="signature"
        className="svg-inline--fa fa-signature fa-w-20 mr-2 fa-lg"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
      >
        <path
          fill="currentColor"
          d="M623.2 192c-51.8 3.5-125.7 54.7-163.1 71.5-29.1 13.1-54.2 24.4-76.1 24.4-22.6 0-26-16.2-21.3-51.9 1.1-8 11.7-79.2-42.7-76.1-25.1 1.5-64.3 24.8-169.5 126L192 182.2c30.4-75.9-53.2-151.5-129.7-102.8L7.4 116.3C0 121-2.2 130.9 2.5 138.4l17.2 27c4.7 7.5 14.6 9.7 22.1 4.9l58-38.9c18.4-11.7 40.7 7.2 32.7 27.1L34.3 404.1C27.5 421 37 448 64 448c8.3 0 16.5-3.2 22.6-9.4 42.2-42.2 154.7-150.7 211.2-195.8-2.2 28.5-2.1 58.9 20.6 83.8 15.3 16.8 37.3 25.3 65.5 25.3 35.6 0 68-14.6 102.3-30 33-14.8 99-62.6 138.4-65.8 8.5-.7 15.2-7.3 15.2-15.8v-32.1c.2-9.1-7.5-16.8-16.6-16.2z"
        ></path>
      </svg>
      Sign your name
    </button>
  </form>
);

const prepareNetlifySigners = netlifySigners =>
  netlifySigners.map(edge => {
    const {
      first_name,
      last_name,
      number,
      data: { college },
    } = edge.node;

    return {
      college: college,
      firstName: first_name,
      lastName: last_name,
      number: number,
    };
  });

export const IndexPageTemplate = ({
  netlifySigners,
  hero,
  letter,
  signers,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const preparedNetlifySigners = prepareNetlifySigners(netlifySigners);
  const totalSignersCount = signers.list.length + netlifySigners.length;

  return (
    <>
      <Hero
        title={hero.title}
        button={hero.button}
        signersCount={totalSignersCount}
        onButtonClick={() => {
          trackEvent("Sign modal open", {}, () => {
            setModalShow(true);
          });
        }}
      />
      <p className="text-center mb-0 mt-2">
        Sign and join <strong>{totalSignersCount}</strong> other academics.
      </p>
      <p className="text-center text-muted">
        <small className="font-italic">
          after you sign, you will be offered some Next Steps organizing ideas.
        </small>
      </p>
      <Letter text={letter.text} />
      <Signers initialSigners={signers.list} signers={preparedNetlifySigners} />
      <SignModal
        show={modalShow}
        onHide={() => {
          trackEvent("Sign modal close", {}, () => {
            setModalShow(false);
          });
        }}
      />
      <SignHiddenForm />
      <ReadProgress />
    </>
  );
};

IndexPageTemplate.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string,
    button: PropTypes.string,
  }),
  letter: PropTypes.shape({
    text: PropTypes.string,
  }),
  signers: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.string),
  }),
  netlifySigners: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        number: PropTypes.number,
        data: PropTypes.shape({
          college: PropTypes.string,
        }),
      }),
    })
  ),
};

const IndexPage = ({ data }) => {
  const {
    allNetlifyFormSubmission: { edges: netlifySigners },
    markdownRemark: { frontmatter },
  } = data;

  return (
    <Layout title="Why Faculty Support College For All · Sign the letter">
      <IndexPageTemplate {...{ netlifySigners, ...frontmatter }} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allNetlifyFormSubmission: PropTypes.any,
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        hero {
          title
          button
        }
        letter {
          text
        }
        signers {
          list
        }
      }
    }
    allNetlifyFormSubmission {
      totalCount
      edges {
        node {
          first_name
          last_name
          number
          data {
            college
          }
        }
      }
    }
  }
`;
