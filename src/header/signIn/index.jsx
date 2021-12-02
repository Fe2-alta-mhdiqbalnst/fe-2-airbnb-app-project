import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import './signIn.scss';

const SignIn = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, emailUpdate]       = useState("");
  const [password, passwordUpdate] = useState("");
  const [token, tokenUpdate]       = useState("");

  const handleSubmit = (e) => { 
    e.preventDefault();
    const objInput = {
      "email": email,
      "password": password
    }
    
    axios.post('http://18.139.84.71/login', objInput )
    .then(({data}) =>{
     localStorage.setItem("token", data.Data.Token);
     localStorage.setItem("user", data.Data.ID);
      window.location.reload();
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    tokenUpdate(localStorage.getItem("token"))
  }, [token])

  return (
    <>
      <Button className="btn-signIn" onClick={handleShow} >
        Masuk
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className="title-daftar">Masuk</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Modal.Title className="title-form">Selamat Datang di AirBnB</Modal.Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group  controlId="formBasicUsername">
          <Form.Control className="p-3 b-bottom" type="email" placeholder="Email" 
            onChange={(e) => emailUpdate(e.target.value) }
          />
        </Form.Group>  
        <Form.Group className=" mb-4" controlId="formBasicPassword">
          <Form.Control className="mb-1 p-3 b-top" type="password" placeholder="Password" 
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

export default SignIn;
