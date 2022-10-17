
import type { NextPage } from 'next'
import { Container, Button } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import Typewriter from 'typewriter-effect';

const Home: NextPage = () => {
  return (
    <div>
      <div className={styles.header}>
        TODO LIST
      </div>
      <Container className={styles.center}>
        <div className={styles.title}>

        <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(80)
            .typeString('Work Better')
            .pauseFor(1000)
            .deleteChars(6)
            .typeString("Faster")
            .start();
        }}
      />
        </div>
        <div className={styles.content}>

              <h1>improve business productivity</h1>
            <p>Lorem ipsum dolor it amet, consectetur
               adipiscing elit. Sed a orci et metus ultrices
               commodo et vitae justo. Donec sit amet
               commodo neque. Sed id tincidunt nisl. Lorem
               ipsum dolor sit amet, consectetur adipiscing
               elit. Donec augue orci, tincidunt eu pretium at,
               consectetur quis tellus. Class aptent taciti
               sociosqu ad litora torquent per conubia nostra,
               per inceptos himenaeos. Duis volutpat nunc
              suscipit mauris vehicula, a pellentesque libero </p>
              <Button className={styles.centerButton}>Get Started!</Button>

        </div>
      </Container>
    </div>
  )
}

export default Home
