import { Button, Modal } from 'react-bootstrap'

function RegisterModal (props : any){
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Register now
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Register now</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button>Send</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default RegisterModal