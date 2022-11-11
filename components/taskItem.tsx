import { Button, ListGroup, Stack, ToggleButton } from "react-bootstrap";
import {
  BsPen,
  BsFillFlagFill,
  BsCheckSquare,
  BsSquare,
  BsCheckSquareFill,
} from "react-icons/bs";
import axios from "axios";

interface props {
  title: string;
  body: string;
  priority: number;
  done: boolean;
  id: number;
  reload: (state: boolean) => any;
  EditClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const priorityColors = ["#007a00", "#ffc107", "#dc3545"];

function TaskItem(props: props) {
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
        props.reload(true);
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

        <Button
          variant="outline-secundary"
          onClick={() => handleChangeState(props)}
        >
          {props.done ? (
            <BsCheckSquareFill color="#0d6efd" size={25} />
          ) : (
            <BsSquare color="gray" size={25} />
          )}
        </Button>

        <Button variant="outline-secundary" onClick={props.EditClickHandler}>
          <BsPen />
        </Button>
      </Stack>
    </ListGroup.Item>
  );
}

export default TaskItem;
