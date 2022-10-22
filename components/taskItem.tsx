import { Badge, Button, Col, ListGroup, Row } from "react-bootstrap";

interface props {
  title: string;
}

// green = low      "success"
// yellow = mid     "warning"
// red = high       "danger"

function TaskItem(props: props) {
  return (
    <ListGroup.Item action>
      <Row>
        <Col>{props.title}</Col>

        <Col md="auto">
          <Badge pill bg="success">
            priority
          </Badge>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default TaskItem;
