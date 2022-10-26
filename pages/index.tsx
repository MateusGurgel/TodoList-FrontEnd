import type { NextPage } from "next";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import Typewriter from "typewriter-effect";
import { useState } from "react";
import RegisterModal from "../components/registerModal";
import LoginModal from "../components/loginModal";

const Home: NextPage = () => {
  const [registerModalShow, setRegisterModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  return (
    <div>
      <div className={styles.header}>
        <a href="\" className={styles.logo}>
          TODO LIST
        </a>

        <div className={styles.header_right}>
          <a
            onClick={() => setLoginModalShow(true)}
            className={styles.rigthSideContent}
          >
            Login
          </a>
          <a
            onClick={() => setRegisterModalShow(true)}
            className={styles.rigthSideContent}
          >
            register
          </a>
        </div>
      </div>

      <div className={styles.banner}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .changeDelay(80)
              .typeString("Work Better")
              .pauseFor(1000)
              .deleteChars(6)
              .typeString("Faster")
              .pauseFor(1000)
              .deleteChars(6)
              .typeString("Smarter")
              .start();
          }}
        />
      </div>

      <RegisterModal
        show={registerModalShow}
        onHide={() => setRegisterModalShow(false)}
      />
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />

      <Container className={styles.content}>
        <Row>
          <Col>
            <h1>Watch our prices!</h1>
            <p>They don't exist cuz we are 100% open source 🤣</p>
            <Button
              variant="outline-primary"
              href="https://github.com/MateusGurgel"
            >
              Show me the source
            </Button>
          </Col>
          <Col>
            <h1>What is a to-do list?</h1>
            <p>
              It’s a list of tasks you need to complete or things that you want
              to do.{" "}
            </p>
          </Col>
          <Col>
            <h1>Easy to use!</h1>
            <p>You literally have to press just 2 buttons</p>
            <Button
              variant="outline-primary"
              onClick={() => setRegisterModalShow(true)}
            >
              Let's get started
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
