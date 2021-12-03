import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import './signUp.scss';

const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userName, userUpdate]     = useState("");
  const [email, emailUpdate]       = useState("");
  const [password, passwordUpdate] = useState("");
  const [token, tokenUpdate]       = useState("");

  const handleSubmit = (e) => { 
    e.preventDefault();
    const objInput = {
      "name": userName,
      "email": email,
      "password": password
    }

    // https://peaceful-citadel-71310.herokuapp.com/
    axios.post('http://18.139.84.71/users', objInput )
    .then(() =>{
      
      const objLogin = {
        "email": email,
        "password": password
      }

         return axios.post('http://18.139.84.71/login', objLogin )
          .then(({data}) => {
            localStorage.setItem("token", data.Data);
            window.location.reload();
          })

    }).catch((err)=>{
      console.log(err);
    })

  }


  useEffect(() => {
    tokenUpdate(localStorage.getItem("token"))

    
  }, [token])

  return (
    <>
      <Button className="btn-signUp" onClick={handleShow}>
        Daftar
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className="title-daftar">Daftar</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Modal.Title className="title-form">Selamat Datang di AirBnB</Modal.Title>
        <Form  onSubmit={(e) => handleSubmit(e)}>
        <Form.Group  controlId="formBasicUsername">
          <Form.Control className="p-3 b-bottom-signup" type="text" placeholder="Username"
            onChange={(e) => userUpdate(e.target.value) }
          />
        </Form.Group>  
        <Form.Group controlId="formBasicEmail">
          <Form.Control className="p-3 b-mid-signup" type="email" placeholder="Email" 
            onChange={(e) => emailUpdate(e.target.value) }
          />
        </Form.Group>
        <Form.Group className=" mb-4" controlId="formBasicPassword">
          <Form.Control className="mb-1 p-3 b-top-signup" type="password" placeholder="Password" 
            onChange={(e) => passwordUpdate(e.target.value) }
          />
          <a className="href" target="_blank" rel="noreferrer" href="https://www.airbnb.co.id/help/article/2855/kebijakan-privasi">Kebijakan Privasi</a>
        </Form.Group>
        
        <Button className="form-control mb-1 p-2 btn-submit" type="submit">
          Lanjutkan
        </Button>
        </Form>
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignUp;
