import React from "react";
import PropTypes from "prop-types";

const Hero = ({ title, button }) => (
  <section className="hero">
    <h1>{title}</h1>
    <button>{button}</button>
  </section>
);

Hero.propTypes = {
  title: PropTypes.string,
  button: PropTypes.string,
};

export default Hero;
