import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";

interface props{
    show: boolean,
    onHide: () => void,
    taskId: number,
}

function ShowTaskModal(props: props) {

  const [taskTitle, setTaskTitle] = useState("task title")
  const [taskDescription, setTaskDescription] = useState("task description")

  useEffect(() => {
    const taskId = props.taskId

    if (taskId === 0){
        return;
    }

    const token = localStorage.getItem("token");
    axios(`http://127.0.0.1:3333/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
        const data = response.data
        setTaskTitle(data.title)
        setTaskDescription(data.description)
    });
  }, [props.show]);

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
<Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{taskTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              required
              disabled 
              name="name"
              type="text"
              placeholder={taskTitle}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Task description</Form.Label>
            <Form.Control
              disabled 
              name="description"
              maxLength={1000}
              as="textarea"
              rows={3}
              placeholder={taskDescription}
              
            />
          </Form.Group>
        </Form>
      </Modal.Body>

    </Modal>
  );
}

export default ShowTaskModal;
