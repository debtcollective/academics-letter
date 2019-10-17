import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

if (typeof window !== `undefined`) {
  require("details-polyfill");
}

const FAQ = ({ entries }) => (
  <section className="faq">
    <div className="collapsable-list">
      {entries.map(({ title, text }, index) => (
        <details
          key={`faq-question-${index}`}
          className="collapsable-list__item"
        >
          <summary className="summary">{title}</summary>
          <div className="content" dangerouslySetInnerHTML={{ __html: text }} />
        </details>
      ))}
    </div>
  </section>
);

FAQ.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default FAQ;
