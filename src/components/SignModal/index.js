import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import NetlifyForm from "react-netlify-form";
import { Link } from "gatsby";
import "./styles.scss";

const SignForm = ({ recaptcha }) => (
  <>
    <Form.Group controlId="formName">
      <Form.Label>
        <strong>Full name</strong>
      </Form.Label>
      <Form.Control type="text" name="name" placeholder="Enter full name" />
    </Form.Group>

    <Form.Group controlId="formEmail">
      <Form.Label>
        <strong>Email address</strong>
      </Form.Label>
      <Form.Control type="email" name="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formSchool">
      <Form.Label>
        <strong>College</strong>
      </Form.Label>
      <Form.Control
        type="text"
        name="college"
        placeholder="Enter college name"
      />
    </Form.Group>

    <Form.Group
      controlId="formSubmit"
      className="text-center d-flex justify-content-center"
    >
      {recaptcha}
    </Form.Group>

    <Form.Group
      controlId="formSubmit"
      className="text-center d-flex justify-content-center"
    >
      <Button className={`mt-2 mt-lg-3 btn-lg`} type="submit">
        <FontAwesomeIcon icon={faSignature} className="mr-2 fa-lg" />
        Sign your name
      </Button>
    </Form.Group>
  </>
);

SignForm.propTypes = {
  recaptcha: PropTypes.node,
};

const LoadingMessage = () => <div>Loading...</div>;

const SuccessMessage = () => (
  <div>
    <h4>Thank your for signing!</h4>
    <p>
      For Action Steps, and to Join the Campaign beyond your signature, click
      below.
    </p>
    <Form.Group
      controlId="formSubmit"
      className="text-center d-flex justify-content-center"
    >
      <Link to="/next-steps" className="nav-link">
        <Button className={`mt-2 mt-lg-3 btn-lg`} type="submit">
          Next Steps
        </Button>
      </Link>
    </Form.Group>
  </div>
);

const ErrorMessage = () => (
  <div>Your information was not sent. Please try again later.</div>
);

const recaptchaSiteKey = process.env.GATSBY_SITE_RECAPTCHA_KEY;

const SignModal = props => (
  <Modal
    {...props}
    animation={false}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    dialogClassName="sign-modal"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        <h1 className="text-center sign-modal-title">
          Faculty Endorse
          <br />
          College for All
        </h1>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <NetlifyForm
        name="Signature Form"
        recaptcha={{
          sitekey: recaptchaSiteKey,
          size: "normal",
        }}
      >
        {({ loading, error, success, recaptcha }) => (
          <div>
            {loading && <LoadingMessage />}
            {error && <ErrorMessage />}
            {success && <SuccessMessage />}
            {!loading && !success && !error && (
              <SignForm recaptcha={recaptcha} />
            )}
          </div>
        )}
      </NetlifyForm>
    </Modal.Body>
  </Modal>
);

export default SignModal;
