import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

const Hero = ({ title, button }) => (
  <section id="hero" className={`mt-md-5 ${styles.heroSection}`}>
    <div className={styles.hero}>
      <h1
        className={`text-center ${styles.heroTitle}`}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <Button href="#" className={`mt-2 btn-lg`}>
        <FontAwesomeIcon icon={faSignature} className="mr-2 fa-lg" />
        {button}
      </Button>
    </div>
  </section>
);

Hero.propTypes = {
  title: PropTypes.string,
  button: PropTypes.string,
};

export default Hero;
