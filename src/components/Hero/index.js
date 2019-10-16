import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

const Hero = ({ title, button }) => (
  <section id="hero" className={styles.heroSection}>
    <div className={styles.hero}>
      <h1 className={styles.heroTitle}>{title}</h1>
      <Button href="#" className={styles.button}>
        <FontAwesomeIcon icon={faSignature} className="mr-2" />
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
