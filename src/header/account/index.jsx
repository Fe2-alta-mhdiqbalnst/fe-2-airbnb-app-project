import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import './account.scss';

const Account = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userName, userUpdate]     = useState("");
  const [email, emailUpdate]       = useState("");
  const [password, passwordUpdate] = useState("");
  const [token, tokenUpdate]       = useState("");
  const [userId, userIdUpdate]     = useState("");
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const handleSubmit = (e) => { 
    e.preventDefault();
    const objInput = {
      "name": userName,
      "email": email,
      "password": password
    }

    axios.put(`http://18.139.84.71/jwt/users/${userId}`, objInput, config )
    .then(({data}) =>{
    window.location.reload();

    }).catch((err)=>{
      console.log(err);
    })

  }


  useEffect(() => {
    tokenUpdate(localStorage.getItem("token"));
    userIdUpdate(localStorage.getItem("user"))

    
  }, [token])

  return (
    <>
      <Button className="btn-Account" onClick={handleShow}>
        Akun
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className="title-daftar">Informasi Pribadi</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Modal.Title className="title-form">Update User</Modal.Title>
        <Form  onSubmit={(e) => handleSubmit(e)}>
        <Form.Group  controlId="formBasicUsername">
          <Form.Control className="p-3 b-bottom-Account" type="text" placeholder="Username"
            onChange={(e) => userUpdate(e.target.value) }
          />
        </Form.Group>  
        <Form.Group controlId="formBasicEmail">
          <Form.Control className="p-3 b-mid-Account" type="email" placeholder="Email" 
            onChange={(e) => emailUpdate(e.target.value) }
          />
        </Form.Group>
        <Form.Group className=" mb-4" controlId="formBasicPassword">
          <Form.Control className="mb-1 p-3 b-top-Account" type="password" placeholder="Password" 
            onChange={(e) => passwordUpdate(e.target.value) }
          />
        </Form.Group>
        
        <Button className="form-control mb-1 p-2 btn-submit" type="submit">
          Edit
        </Button>
        </Form>
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Account;
