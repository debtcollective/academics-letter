import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, Hero } from "../components";

export const IndexPageTemplate = ({ hero }) => (
  <>
    <Layout>
      <Hero title={hero.title} button={hero.button} />
    </Layout>
  </>
);

IndexPageTemplate.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string,
    button: PropTypes.string,
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
      }
    }
  }
`;
