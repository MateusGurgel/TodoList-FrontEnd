import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Router from "next/router";

interface Props {
  show: boolean;
  onHide: () => void;
  taskId: number;
}

interface Task{
  title: string;
  description: string;
  priority: number;
}

function EditTaskModal(props: Props) {
  const [editMode, setEditMode] = useState(false);
  const [task, setTask] = useState<Task>({title: "loading...", description: "loading...", priority: 0});
  const [isLoading, setLoading] = useState(false);

  const handleShow = async (taskID: number) => {

    return new Promise<Task>((resolve, reject) => {

      const taskId = props.taskId;
    const token = localStorage.getItem("token");

    if (taskId === 0) {
      reject();
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios(`http://127.0.0.1:3333/tasks/${taskId}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
        reject()
      });

    });
  };

  const handleDelete = async (taskId: number) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const deleteRequest = await axios
      .delete(`http://127.0.0.1:3333/tasks/${taskId}`, config)
      .then((response) => {
        props.onHide();
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

  const handleUpdate = async (event: FormEvent) => {
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

  useEffect(() => {
    
    setLoading(props.show);

    if (isLoading){
        handleShow(props.taskId).then((task) => {
        setTask(task);
        setLoading(false);
      })
    }
  }, [props.onHide])
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
          {isLoading ? 'Loading…' : task.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              required
              disabled={!editMode}
              name="name"
              type="text"
              maxLength={50}
              placeholder={isLoading ? 'Loading…' : task.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Task description</Form.Label>
            <Form.Control
              disabled={!editMode}
              name="description"
              maxLength={1000}
              as="textarea"
              rows={3}
              placeholder={ isLoading ? 'Loading…' : task.description }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="priority">
            <Form.Label>Task priority</Form.Label>
            <Form.Select
              name="priority"
              disabled={!editMode}
              defaultValue={0}
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
            variant="outline-primary"
            style={{ float: "right" }}
            type={"submit"}
          >
            Save
          </Button>

          <Button
            disabled={editMode}
            variant="outline-danger"
            style={{ float: "right", margin: "0px 5px" }}
            onClick={() => handleDelete(props.taskId)}
          >
            Delete
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTaskModal;
