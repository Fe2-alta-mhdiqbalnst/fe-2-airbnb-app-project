import './create-homestay.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const CreateHomestay = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);
  const [homestayName, homestayNameUpdate]  = useState("");
  const [price, priceUpdate]                = useState(0);
  const [description, descriptionUpdate]    = useState("");
  const [address, addressUpdate]            = useState("");
  const [file, fileUpdate]                  = useState(null);
  const [token, tokenUpdate]                = useState("");
  const [loading, setLoading]               = useState(false);

  console.log(token);

  useEffect(() => {
    tokenUpdate(localStorage.getItem("token"));
  }, [token]);

  const headers = {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + token
  };
    const handleSubmit = (e) => { 
      e.preventDefault();
      setValidated(true);
      setLoading(true);
      const formData = new FormData();
      formData.append("name_homestay" , homestayName)
      formData.append("price" , price)
      formData.append("description" , description)
      formData.append("address" , address)
      formData.append("file" , file)

      axios.post('http://18.139.84.71/jwt/homestay', formData,{headers: headers})
    .then(({data}) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Create homestay success",
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        handleClose();
        window.location.reload()
      })
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }

  const handleCLear = () => {
    homestayNameUpdate("");
    priceUpdate(0);
    descriptionUpdate("");
    addressUpdate("");
    fileUpdate(null)
    setValidated(false);
    handleClose();
  }

  return (
    <>
     <button onClick={handleShow} >
        Create
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title className="title-daftar"></Modal.Title>
          <button  className="btn-close" onClick={() => handleCLear()}></button>
        </Modal.Header>
        <Modal.Body >
        <Modal.Title className="title-form">Create Homestay</Modal.Title>
        <Form  noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Form.Group  controlId="formBasicUsername">
          <Form.Control className="p-3 b-bottom-Account" type="text" placeholder="Nama Homestay"
            onChange={(e) => homestayNameUpdate(e.target.value) }
            required
          />
        </Form.Group>  
        <Form.Group controlId="formBasicEmail">
          <Form.Control className="p-3 b-mid-Account" type="number" placeholder="Harga per malam"
            onChange={(e) => priceUpdate(e.target.value) }
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control className="p-3 b-mid-Account" type="text" placeholder="Description"
            onChange={(e) => descriptionUpdate(e.target.value) }
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control className="p-3 b-mid-Account" type="text" placeholder="Alamat"
            onChange={(e) => addressUpdate(e.target.value) }
            required
          />
        </Form.Group>
        <Form.Group className=" mb-4" controlId="formBasicPassword">
          <Form.Control className="mb-1 p-3 b-top-Account" type="file" placeholder="Password" 
            onChange={(e) => fileUpdate(e.target.files[0]) }
            required
          />
        </Form.Group>
        <Button className=" mb-1 p-2 btn-submit-update" type="submit">
        {loading && <Spinner animation="border" variant="light" />}
          {!loading && <span>Create</span>}
        </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CreateHomestay;