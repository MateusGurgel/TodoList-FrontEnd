import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Router from "next/router";

interface props {
  show: boolean;
  onHide: () => void;
  taskId: number;
}

function ShowTaskModal(props: props) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState(0);
  const [validated, setValidated] = useState(false);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const taskId = props.taskId;

    if (taskId === 0) {
      return;
    }

    const token = localStorage.getItem("token");
    axios(`http://127.0.0.1:3333/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      const task = response.data;
      setTaskTitle(task.title);
      setTaskDescription(task.description);
      setTaskPriority(task.priority);
    });
  }, [props.show, props.taskId]);

  function resetModalInformation() {
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority(0);
    setEditMode(false);
  }

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
      priority: [Number(data.priority)],
    };

    const put = await axios
      .put(
        `http://127.0.0.1:3333/tasks/${props.taskId}`,
        bodyParameters,
        config
      )
      .then((response) => {
        Router.reload();
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

  if (!taskTitle) {
    return null;
  }

  if (!props.show) {
    resetModalInformation();
  }

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {taskTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              required
              disabled={!editMode}
              name="name"
              type="text"
              defaultValue={taskTitle}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Task description</Form.Label>
            <Form.Control
              defaultValue={taskDescription}
              disabled={!editMode}
              name="description"
              maxLength={1000}
              as="textarea"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="priority">
            <Form.Label>Task priority</Form.Label>
            <Form.Select
              name="priority"
              disabled={!editMode}
              defaultValue={taskPriority}
            >
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </Form.Select>
          </Form.Group>

          <Button
            disabled={editMode}
            onClick={() => {
              setEditMode(true);
            }}
          >
            edit
          </Button>

          <Button
            disabled={!editMode}
            style={{ margin: "10px" }}
            type={"submit"}
          >
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ShowTaskModal;
