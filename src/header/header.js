import React, { useEffect, useState } from "react";
import './header.scss';
import { FaUserCircle } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import SignUp from './signUp';
import SignIn from './signIn';
import Account from './account';
import { fetchAsyncCity } from "../view/Reservation/homestaySlice";
import { fetchPost } from "../store/actions/fetchPost";
import allStore from "../store/actions";


const Header = () => {
  const [show, setShow] = useState(false);
  //searching
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  //searching city
  const posts = useSelector(( {listPost}) => listPost)
  useEffect(() => {
    dispatch(allStore.fetchPost());
  },[dispatch])
  
  const homey = () => {
    return posts.Data
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(location);
    if (location === "") return alert("Please enter keyword you want to search!")
    dispatch(fetchPost(location))
  }

  const handleChange = (e) => {
    console.group(e, 'onChange')
  };

  const token = localStorage.getItem("token");
  
  const logout = () => {
    localStorage.clear()
    window.location.reload();
  }

  const login = () => {
    if (token === null){
      return(
        [<SignUp />,<SignIn />]
      )
    }
    return (
      <div>
        <p><Account/></p>
        <button onClick={() => logout()}>logout</button>
      </div>
    )
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
                  <Dropdown className="user">
                    <Dropdown.Toggle  id="dropdown-basic">
                    <FaBars className="bars"/>
                    <FaUserCircle className="user-img"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                     {login()}
                    </Dropdown.Menu>
                  </Dropdown>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  );
};

export default Header; 