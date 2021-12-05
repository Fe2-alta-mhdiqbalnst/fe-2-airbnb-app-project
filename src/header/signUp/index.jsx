import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import './signUp.scss';

const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [userName, userUpdate]     = useState("");
  const [email, emailUpdate]       = useState("");
  const [password, passwordUpdate] = useState("");
  const [loading, setLoading]      = useState(false);
  const arrEmail = email.split("");
  const checkEmail = arrEmail.find((el) => el === "@");
  const checkEmail2 = arrEmail.find((el) => el === ".");

  const handleSubmit = (e) => { 
    e.preventDefault();
    setValidated(true);
    setLoading(true);
    if (userName.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Username tidak boleh kosong',
      }).then(() => { setLoading(false);})
    }else{
      if (email.length === 0 || !checkEmail || !checkEmail2) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Email tidak boleh kosong',
        }).then(() => { setLoading(false);})
      }else {
    if (password.length < 5 ) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      text: 'Password tidak boleh kurang dari 5 karakter',
    }).then(() => { setLoading(false);})
    }else {
            const objInput = {
              "name": userName,
              "email": email,
              "password": password
            }
  
            axios.post('http://18.139.84.71/users', objInput )
            .then(() =>{
              
                const objLogin = {
                  "email": email,
                  "password": password
                }

                return axios.post('http://18.139.84.71/login', objLogin )
                .then(({data}) => {
                  localStorage.setItem("token", data.Data.Token);
                  localStorage.setItem("userId", data.Data.ID);
                  localStorage.setItem("userName", data.Data.Name);
                  localStorage.setItem("email", email);
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Daftar akun berhasil",
                    showConfirmButton: false,
                    timer: 1500
                  }).then((result) => {
                    handleClose();
                  })
                })

            }).catch((err)=>{
              Swal.fire({
                icon: 'error',
                title: 'Email sudah terdaftar'
              }).then(() => { setLoading(false);})
            }).finally(() => {
              setLoading(false);
            });
        }
      }
    }  
  }

  const handleCLear = () => {
    userUpdate("");
    emailUpdate("");
    setValidated(false);
    handleClose();
  }

  return (
    <>
      <button className="btn-Account" onClick={handleShow} >
        Daftar
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header >
          <Modal.Title className="title-daftar">Daftar</Modal.Title>
          <button  className="btn-close" onClick={() => handleCLear()}></button>
        </Modal.Header>
        <Modal.Body >
        <Modal.Title className="title-form">Selamat Datang di AirBnB</Modal.Title>
        <Form noValidate validated={validated}  onSubmit={(e) => handleSubmit(e)}>
        <Form.Group  controlId="formBasicUsername">
          <Form.Control className="p-3 b-bottom-signup" type="text" placeholder="Username"
            onChange={(e) => userUpdate(e.target.value) }
            required
          />
        </Form.Group>  
        <Form.Group controlId="formBasicEmail">
          <Form.Control className="p-3 b-mid-signup" type="email" placeholder="Email" 
            onChange={(e) => emailUpdate(e.target.value) }
            required
          />
        </Form.Group>
        <Form.Group className=" mb-4" controlId="formBasicPassword">
          <Form.Control className="mb-1 p-3 b-top-signup" type="password" placeholder="Password" 
            onChange={(e) => passwordUpdate(e.target.value) }
            required
          />
          <a className="href" target="_blank" rel="noreferrer" href="https://www.airbnb.co.id/help/article/2855/kebijakan-privasi">Kebijakan Privasi</a>
        </Form.Group>
        
        <Button className=" mb-1 p-2 btn-submit" type="submit">
          {loading && <Spinner animation="border" variant="light" />}
          {!loading && <span>Lanjutkan</span>}
        </Button>
        </Form>
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignUp;
