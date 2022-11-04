import { Button, ListGroup, Stack, ToggleButton } from "react-bootstrap";
import { BsPen, BsFillFlagFill } from "react-icons/bs";
import axios from "axios";
import Router from "next/router";

interface props {
  title: string;
  body: string;
  priority: number;
  done: boolean;
  id: number;
  EditClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const priorityColors = ["#007a00", "#ffc107", "#dc3545"];

function TaskItem(props: props) {

  const handleDelete = async(taskId: number) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };


    const put = await axios
      .delete(`http://127.0.0.1:3333/tasks/${props.id}`, config)
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
      })
  }

  const handleChangeState = async (props: props) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      done: !props.done,
    };

    const put = await axios
      .put(`http://127.0.0.1:3333/tasks/${props.id}`, bodyParameters, config)
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

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.title}</div>
        {props.body}
      </div>

      <Stack direction="horizontal" gap={2}>
        
        <div className="m-3">
          <BsFillFlagFill color={priorityColors[props.priority]} size={20} />
        </div>

        
        <ToggleButton
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={props.done}
          value="1"
          onClick={() => handleChangeState(props)}
        >
          Done
        </ToggleButton>
          
        <Button variant="outline-danger" onClick={() => handleDelete(props.id)}>
          Delete
        </Button>


        <Button variant="outline-primary" onClick={props.EditClickHandler}>
          <BsPen />
        </Button>
      </Stack>
    </ListGroup.Item>
  );
}

export default TaskItem;
