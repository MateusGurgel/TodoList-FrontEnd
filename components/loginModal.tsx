import { AsyncLocalStorage } from 'async_hooks';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'

function LoginModal (props : any){

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event : FormEvent) => {

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    const post = await axios.post("http://127.0.0.1:3333/login/", {
      "email": data.email,
      "password": data.password,

    }).then((response)=>{
      console.log(response)
      localStorage.setItem('token', response.data.token)
      document.location.href="dashboard";
    }).catch(function (error) {
      if (error.response) {
        alert(error.response.data.message);

      } else if (error.request) {
        alert("Conection Error")
        console.log(error.request);

      } else {
        console.log('Error', error.message);

      }
      console.log(error.config);

    })
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
            Login
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

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                pattern="().{8,}"
                placeholder="Password (Minimum 8 characters)" />
            </Form.Group>

            <Button type="submit">Login</Button>

          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  export default LoginModal