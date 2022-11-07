import axios from "axios";
import { FormEvent, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function RegisterModal(props: any) {
  const [validated, setValidated] = useState(false);
  const [feedBackMessage, setFeedBackMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    //placeHolder

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const post = await axios
      .post("http://127.0.0.1:3333/users/", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(() => {
        setFeedBackMessage("");
        props.onHide();
      })
      .catch(function (error) {
        if (error.response) {
          setFeedBackMessage(error.response.data.errors[0].message);
        } else if (error.request) {
          alert("Conection Error");
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Register now
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              name="email"
              type="email"
              placeholder="email@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              name="username"
              type="text"
              placeholder="Username"
              minLength={6}
              maxLength={30}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              minLength={8}
              maxLength={32}
              placeholder="Password (Minimum 8 characters)"
            />
          </Form.Group>

          <p style={{ color: "red" }}> {feedBackMessage} </p>

          <Button type="submit">Register</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
