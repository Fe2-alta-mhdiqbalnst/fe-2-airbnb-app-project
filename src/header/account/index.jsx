import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import './account.scss';

const Account = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [userName, userUpdate]      = useState(localStorage.getItem("userName"));
  const [email, emailUpdate]        = useState(localStorage.getItem("email"));
  const [password, passwordUpdate]  = useState("");
  const [token, tokenUpdate]        = useState("");
  const [userId, userIdUpdate]      = useState("");

  const arrEmail = email.split("");
  const checkEmail = arrEmail.find((el) => el === "@");
  const checkEmail2 = arrEmail.find((el) => el === ".");

  useEffect(() => {
    tokenUpdate(localStorage.getItem("token"));
    userIdUpdate(localStorage.getItem("userId"));
  }, [token]);

  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    setValidated(true);
    if (userName.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Username tidak boleh kosong',
      })
    }else{
    if (email.length === 0 || !checkEmail || !checkEmail2 ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Email tidak boleh kosong',
      })
    }else {
    if (password.length < 5 ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Password tidak boleh kurang dari 5 karakter',
      })
    }else {
      const objInput = {
        "name": userName,
        "email": email,
        "password": password
    }

    axios.put(`http://18.139.84.71/jwt/users/${userId}`, objInput, config )
    .then(({data}) =>{
      localStorage.setItem("userName", userName);
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Data berhasil diubah',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        handleClose();
        passwordUpdate("")
        setValidated(false);
      })
    }).catch((err)=>{
      Swal.fire({
        icon: 'error',
        text: 'Data gagal diubah / Email sudah pernah terdaftar'
      });
    })
      }
      }
    }
  }

  const handleCLear = () => {
    userUpdate("");
    emailUpdate("");
    setValidated(false);
    handleClose();
    userUpdate(localStorage.getItem("userName"))
    emailUpdate(localStorage.getItem("email"))
  }

  const handleDelete = () => {
        Swal.fire({
          title: 'Apakah kamu yakin?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Hapus'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://18.139.84.71/jwt/users/${userId}`, config)
                .then(() => {
                  Swal.fire(
                    'Dihapus!',
                    'Akun kamu telah dihapus.',
                    'success'
                  )
                })
          }
        })
  }

  return (
    <>
      <button className="btn-Account" onClick={handleShow}>
        Akun
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title className="title-daftar">Informasi Pribadi</Modal.Title>
          <button  className="btn-close" onClick={() => handleCLear()}></button>
        </Modal.Header>
        <Modal.Body >
        <Modal.Title className="title-form">Update User</Modal.Title>
        <Form  noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Form.Group  controlId="formBasicUsername">
          <Form.Control className="p-3 b-bottom-Account" type="text" placeholder="username"
            onChange={(e) => userUpdate(e.target.value) }
            value = {userName}
            required
          />
        </Form.Group>  
        <Form.Group controlId="formBasicEmail">
          <Form.Control className="p-3 b-mid-Account" type="email" placeholder="email"
            onChange={(e) => emailUpdate(e.target.value) }
            value = {email}
            required
          />
        </Form.Group>
        <Form.Group className=" mb-4" controlId="formBasicPassword">
          <Form.Control className="mb-1 p-3 b-top-Account" type="password" placeholder="Password" 
            onChange={(e) => passwordUpdate(e.target.value) }
            required
          />
        </Form.Group>
        <Button className=" mb-1 p-2 btn-submit-update" type="submit">
          Edit
        </Button>
        </Form>
        <button className="btn-delete mt-2" onClick={() => handleDelete()}>Delete akun</button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Account;
