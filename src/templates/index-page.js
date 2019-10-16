import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, Hero, Letter, Signers } from "../components";

export const IndexPageTemplate = ({ hero, letter, signers }) => (
  <>
    <Hero title={hero.title} button={hero.button} />
    <Letter text={letter.text} />
    <Signers signers={signers.list} />
  </>
);

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
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate {...frontmatter} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
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
  }
`;
