import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";

const Signers = ({ signers }) => {
  const signersCopy = [].concat(signers);
  const col1 = signersCopy.splice(0, Math.ceil(signers.length / 2));
  const col2 = signersCopy;

  return (
    <section id="signers" className={`mt-5`}>
      <Container>
        <Row>
          <Col>
            <h2 className="mb-2 font-weight-bold">Initial Signers</h2>
          </Col>
        </Row>
        <Row>
          {[col1, col2].map((col, colIndex) => (
            <Col lg={6} key={colIndex}>
              {col.map((signer, index) => (
                <p className={styles.signersItem} key={`${colIndex}-${index}`}>
                  {signer}
                </p>
              ))}
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

Signers.propTypes = {
  signers: PropTypes.arrayOf(PropTypes.string),
};

export default Signers;
