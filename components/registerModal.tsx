import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'

function RegisterModal (props : any){

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event : FormEvent) => {

    //placeHolder

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try{
      const post = await axios.post("http://127.0.0.1:3333/users/", {
        "username": data.username,
        "email": data.email,
        "password": data.password,
      })
      alert('Account Created with Success!')
    }catch (err) {
      console.error(err)
      alert("Connection error")
    }
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
                name='email'
                type="email" 
                placeholder="email@example.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
              required
              name='username'
              type="text"
              placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                pattern="().{8,}"
                placeholder="Password (Minimum 8 characters)" />
            </Form.Group>

              <Button type="submit">Submit form</Button>

          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  export default RegisterModal