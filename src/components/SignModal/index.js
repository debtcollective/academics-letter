import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import Recaptcha from "react-google-recaptcha";
import { Link } from "gatsby";
import { trackEvent } from "../../lib/amplitude";
import "./styles.scss";

const RECAPTCHA_KEY =
  process.env.SITE_RECAPTCHA_KEY || process.env.GATSBY_SITE_RECAPTCHA_KEY;

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class SignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false,
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRecaptcha = value => {
    this.setState({ "g-recaptcha-response": value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        "g-recaptcha-response": this.state["g-recaptcha-response"],
        name: this.state.name,
        email: this.state.email,
        college: this.state.college,
      }),
    })
      .then(() => {
        trackEvent("Signature success");
        this.setState({ success: true });
      })
      .catch(() => {
        trackEvent("Signature error");
        this.setState({ error: true });
      });
  };

  render() {
    const { success, error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    if (success) {
      return <SuccessMessage />;
    }

    return (
      <form
        name="letter-form"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="__bf"
        data-netlify-recaptcha="true"
        onSubmit={this.handleSubmit}
      >
        <Form.Control type="hidden" name="form-name" value="letter-form" />

        <Form.Group controlId="formName">
          <Form.Label>
            <strong>Full name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter full name"
            required={true}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>
            <strong>Email address</strong>
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required={true}
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">
            Preferably use your <strong>.edu</strong> email. We'll never share
            your email with anyone
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
            required={true}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group
          controlId="formSubmit"
          className="text-center d-flex justify-content-center"
        >
          <Recaptcha
            className="field"
            ref={recaptcha => {
              this.recaptcha = recaptcha;
            }}
            sitekey={RECAPTCHA_KEY}
            onChange={this.handleRecaptcha}
          />
        </Form.Group>

        <Form.Group
          controlId="formSubmit"
          className="text-center d-flex justify-content-center"
        >
          <Button className={`mt-2 mt-lg-3 btn-lg`} type="submit">
            <FontAwesomeIcon
              icon={faSignature}
              className="mr-2 fa-lg"
              width={32}
            />
            Sign your name
          </Button>
        </Form.Group>
      </form>
    );
  }
}

const ErrorMessage = () => (
  <div>Your information was not sent. Please try again later.</div>
);

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
      <Link
        to="/next-steps"
        className="nav-link"
        onClick={() => {
          debugger;
          trackEvent("Signature next steps");
        }}
      >
        <Button className={`mt-2 mt-lg-3 btn-lg`} type="submit">
          Next Steps
        </Button>
      </Link>
    </Form.Group>
  </div>
);

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
      <SignForm />
    </Modal.Body>
  </Modal>
);

export default SignModal;
