import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./styles.scss";

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
        <h1>Faculty Endorse College for All</h1>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>
            <strong>Full name</strong>
          </Form.Label>
          <Form.Control type="email" placeholder="Enter full name" />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>
            <strong>Email address</strong>
          </Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formSchool">
          <Form.Label>
            <strong>College</strong>
          </Form.Label>
          <Form.Control type="text" placeholder="Enter college name" />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
);

export default SignModal;
