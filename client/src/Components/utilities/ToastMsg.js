import {Toast,Row,Col,Button} from 'react-bootstrap'
import {useEffect, useState} from 'react'

function ToastMsg({msg,t}) {
    const [show, setShow] = useState(false);
  useEffect(()=>{
    console.log(t)
    setShow(true)
  },[t])
  console.log(show)
    return (
        <Toast.Container position="top-end">
      <Row>
        <Col xs={6}>
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
            </Toast.Header>
            <Toast.Body>{msg}</Toast.Body>
          </Toast>
        </Col>
      </Row>
      </Toast.Container>
    );
  }
  
export default ToastMsg;