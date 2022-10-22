import type { NextPage } from "next";
import { Container, Button, Stack, Row, Col, ListGroup } from "react-bootstrap";
import TaskItem from "../components/taskItem";
import styles from "../styles/Dashboard.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <div className={styles.header}>
        <a href="\" className={styles.logo}>
          TODO LIST
        </a>
        <div className={styles.header_right}></div>
      </div>

      <Container className={styles.content}>
        <Stack gap={5}>
          <Button variant="outline-primary">Add</Button>
          <ListGroup>
            <TaskItem title="Brabor"></TaskItem>
          </ListGroup>
        </Stack>
      </Container>
    </div>
  );
};

export default Home;
