import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import './signIn.scss';
 
const SignIn = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, emailUpdate]       = useState("");
  const [password, passwordUpdate] = useState("");
  const [loading, setLoading]      = useState(false);

  const handleSubmit = (e) => { 
    e.preventDefault();
    setLoading(true)

    const objInput = {
      "email": email,
      "password": password
    }
    
    axios.post('http://18.139.84.71/login', objInput )
    .then(({data}) =>{
      console.log(data);
     localStorage.setItem("token", data.Data.Token);
     localStorage.setItem("userId", data.Data.ID);
     localStorage.setItem("userName", data.Data.Name);
     localStorage.setItem("email", email);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.Message,
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        handleClose();
      })

    }).catch((err)=>{
      Swal.fire({
        icon: 'error',
        text: err.response.data.Message
      })
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <>
      <button className="btn-Account" onClick={handleShow} >
        Masuk
      </button>

      <Modal show={show} onHide={handleClose}  backdrop="static">
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
        
        <Button  className="mb-1 p-2 btn-submit" type="submit">
          {loading && <Spinner animation="border" variant="light" />}
          {!loading && <span>Lanjutkan</span>}
        </Button>
        </Form>
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignIn;
