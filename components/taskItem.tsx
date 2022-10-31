import { Badge, Button, Col, ListGroup, Row } from "react-bootstrap";
import { BsPen } from "react-icons/bs";

interface props {
  title: string;
  body: string;
  priority: number;
  EditClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const colors = ["success", "warning", "danger"];

function TaskItem(props: props) {
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
        <Button variant="outline-primary" onClick={props.EditClickHandler}>
          <BsPen />
        </Button>
      </div>

    </ListGroup.Item>
  );
}

export default TaskItem;
