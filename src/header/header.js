import React, { useState } from "react";
import './header.scss';
import { FaUserCircle } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa'
import { Link, useNavigate} from "react-router-dom";
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { fetchPost } from "../store/actions/fetchPost";
import SignUp from './signUp';
import SignIn from './signIn';
import Account from './account';
import Swal from 'sweetalert2';

const Header = () => {
  const [show, setShow] = useState(false);
  const [isLogin, setLogin] = useState([<SignUp />,<SignIn />]);
  const navigate = useNavigate();
  //searching
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (location === "") return alert("Please enter keyword you want to search!")
    dispatch(fetchPost(location.title));
  }

  const handleChange = (e) => {
    console.group(e, 'onChange')
  };

  const toMytrip = () => {
    navigate('/trip')
  }

  const toMyHomestay = () => {
    navigate('/my-homestay')
  }

  const logout = () => {
    localStorage.clear()
    setLogin([<SignUp />,<SignIn />]);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Anda telah logout..',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const login = () => {
    if(localStorage.getItem("token")){
    setLogin([<Account/>,
      <Dropdown.Item><button className="btn-Account" onClick={() => toMytrip()}>My Trip</button></Dropdown.Item>,
      <Dropdown.Item><button className="btn-Account"  onClick={() => toMyHomestay()}>My Homestay</button></Dropdown.Item>,
      <Dropdown.Item><button className="btn-Account b-logout" onClick={() => logout()}>Logout</button></Dropdown.Item>])
    }
  }

  return (
    <div className="header">
      <Navbar expand="lg" className="fixed-top navbar-main">
          <Container fluid>
            <div>
              <Link className="logo" to="/">
                <div>
                  <i className="fab fa-airbnb airbnb"></i>
                  <h6>airbnb</h6>
                </div>
              </Link>
            </div>
            <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
              <form onSubmit={submitHandler}>
                <div className="search-bar">
                  <button className="location">
                    <div>
                      Location
                      <input type="text" value={location} placeholder="Starts your search" onChange={(e) =>{
                        handleChange(e)
                        setLocation(e.target.value)
                      }} />
                    </div>
                  </button>

                  <button type="submit" className="btn-search"><i className="fa fa-search src-icon" ></i> </button>
                </div>
              </form>
              <div className="navbar-btn">
                  <Dropdown className="user" onClick={() => login()}>
                    <Dropdown.Toggle  id="dropdown-basic" >
                    <FaBars className="bars"/>
                    <FaUserCircle className="user-img"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    {isLogin}
                    </Dropdown.Menu>
                  </Dropdown>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* {
        show?
        <div className="calendar">
        <Calendar onChange={onChange} value={startDate} />{startDate.toString()}
        </div>
        : null
        } */}


    </div>
  );
};

export default Header; 