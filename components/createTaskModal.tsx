import axios from "axios";
import { FormEvent, useState } from "react";
import { Button, Modal, Form, InputGroup, Badge } from "react-bootstrap";
import Router from 'next/router'

function CreateTaskModal(props: any) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      title: data.name,
      description: data.description,
      priority: [ 1 ],
    };

    const post = await axios
      .post("http://127.0.0.1:3333/tasks/", bodyParameters, config)
      .then((response) => {
        Router.reload()
      })
      .catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
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
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>First name</Form.Label>
            <Form.Control 
            required 
            name="name"
            type="text" 
            placeholder="Task name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="priority">
            <Form.Label>taskPriority</Form.Label>
            <Form.Select 
            required
            name="priority"
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
            name="description" 
            as="textarea"
            rows={3} />
          </Form.Group>

          <Button type="submit">Add</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateTaskModal;
