import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";

const splitIntoTwo = array => {
  const col1 = array.slice(0, Math.ceil(array.length / 2));
  const col2 = array.slice(Math.ceil(array.length / 2));

  return [col1, col2];
};

const sortSigners = signers =>
  signers.sort((a, b) => {
    var lastNameA = (a.lastName || "").toUpperCase();
    var lastNameB = (b.lastName || "").toUpperCase();

    return lastNameA > lastNameB ? 1 : -1;
  });

const prepareSigners = signers => {
  return sortSigners(signers);
};

const Signers = ({ initialSigners, signers }) => {
  // Split initial signers into two groups
  const initialSignersCols = splitIntoTwo(initialSigners);

  // Split signers into two groups
  const preparedSigners = prepareSigners(signers);
  const signersCols = splitIntoTwo(preparedSigners);

  return (
    <section id="signers" className={`mt-5`}>
      <Container>
        <Row>
          <Col>
            <h2 className="mb-2 font-weight-bold">
              Initial Signers<small>*</small>
            </h2>
          </Col>
        </Row>
        <Row>
          {initialSignersCols.map((col, colIndex) => (
            <Col lg={6} key={colIndex}>
              {col.map((signer, index) => (
                <p className={styles.signersItem} key={`${colIndex}-${index}`}>
                  {signer}
                </p>
              ))}
            </Col>
          ))}
        </Row>
        <Row className="mt-4">
          <Col>
            <h2 className="mb-2 font-weight-bold">
              Signers<small>*</small>
            </h2>
          </Col>
        </Row>
        <Row>
          {signersCols.map((col, colIndex) => (
            <Col lg={6} key={colIndex}>
              {col.map(signer => {
                const firstName = signer.firstName.toLowerCase();
                const lastName = signer.lastName.toLowerCase()
                const college = signer.college

                return (<p className={styles.signersItem} key={signer.number}>
                  {firstName} {lastName}, {college}
                </p>)
              })}
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <small className="text-muted mt-2">
              * Institutional affiliations are for identification purposes only
            </small>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

Signers.propTypes = {
  initialSigners: PropTypes.arrayOf(PropTypes.string),
  signers: PropTypes.arrayOf(
    PropTypes.shape({
      college: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      number: PropTypes.number,
    })
  ),
};

export default Signers;
