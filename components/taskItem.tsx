import { Button, ListGroup, ToggleButton } from "react-bootstrap";
import { BsPen } from "react-icons/bs";
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

const colors = ["success", "warning", "danger"];

function TaskItem(props: props) {

  const handleTaskChangeState = async (props: props) => {
    
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      done: !props.done,
    };

    const put = await axios
      .put(
        `http://127.0.0.1:3333/tasks/${props.id}`,
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

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.title}</div>
        {props.body}
      </div>

      <div>

        <ToggleButton
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={props.done}
          value="1"
          onClick={() => handleTaskChangeState(props)}
        >
          Done
        </ToggleButton>

        <Button variant="outline-primary" onClick={props.EditClickHandler}>
          <BsPen />
        </Button>
      </div>
    </ListGroup.Item>
  );
}

export default TaskItem;
