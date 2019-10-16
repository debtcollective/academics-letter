import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, Hero, Letter, Signers } from "../components";

export const NextStepsTemplate = ({ hero, letter, signers }) => (
  <>
    <Hero title={hero.title} button={hero.button} />
  </>
);

NextStepsTemplate.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <NextStepsTemplate {...frontmatter} />
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
  query NextStepsTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "next-steps" } }) {
      frontmatter {
        hero {
          title
        }
      }
    }
  }
`;
