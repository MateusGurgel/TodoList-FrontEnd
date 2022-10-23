import { Badge, Button, Col, ListGroup, Row } from "react-bootstrap";

interface props {
  title: string;
  body: string;
}

// green = low      "success"
// yellow = mid     "warning"
// red = high       "danger"

function TaskItem(props: props) {
  return (
    <ListGroup.Item
      action
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.title}</div>
        {props.body}
      </div>
      <Badge bg="primary" pill>
        Priority
      </Badge>
    </ListGroup.Item>
  );
}

export default TaskItem;
