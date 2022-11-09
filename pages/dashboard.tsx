import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Container, Button, Stack, ListGroup, Badge } from "react-bootstrap";
import CreateTaskModal from "../components/createTaskModal";
import EditTaskModal from "../components/editTaskModal";
import TaskItem from "../components/taskItem";
import styles from "../styles/Dashboard.module.css";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  done: boolean;
}

const Home: NextPage = () => {
  const [editTaskModalShow, setShowTaskModalShow] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(0);

  const [createTaskModalShow, setCreateTaskModalShow] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if (token === null){
      document.location.href = "../";
    }

    axios("http://127.0.0.1:3333/tasks/", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setTasks(response.data);
    });
  }, [editTaskModalShow, createTaskModalShow]);

  return (
    <div>
      <div className={styles.header}>
        <a href="\" className={styles.logo}>
          TODO LIST
        </a>
        <div className={styles.header_right}></div>
      </div>

      <CreateTaskModal
        show={createTaskModalShow}
        onHide={() => setCreateTaskModalShow(false)}
      />

      <EditTaskModal
        show={editTaskModalShow}
        onHide={() => setShowTaskModalShow(false)}
        taskId={selectedTaskId}
      />

      <Container className={styles.content}>
        <Stack gap={5}>
          <Button
            variant="outline-primary"
            onClick={() => setCreateTaskModalShow(true)}
          >
            Add
          </Button>
          <ListGroup>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                body={task.description}
                priority={task.priority}
                done={task.done}
                id={task.id}
                EditClickHandler={() => {
                  setSelectedTaskId(task.id);
                  setShowTaskModalShow(true);
                }}
              ></TaskItem>
            ))}
          </ListGroup>
        </Stack>
      </Container>
    </div>
  );
};

export default Home;
