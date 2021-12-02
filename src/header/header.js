import React, { useState } from "react";
import './header.scss';
import { FaUserCircle } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { fetchPost } from "../store/actions/fetchPost";
import SignUp from './signUp';
import SignIn from './signIn';


const Header = () => {
  const [show, setShow] = useState(false);
  //searching
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(location);
    if (location === "") return alert("Please enter keyword you want to search!")
    dispatch(fetchPost(location.title));
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
        <p>Akun</p>
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

                  <button className="checkIn" onClick={()=>setShow(!show)}>
                    <div>
                    Check in <br/>
                    Add dates
                    </div>
                  </button>
                  <button className="checkOut" onClick={()=>setShow(!show)}>
                    <div>
                    Check out <br/>
                    Add dates
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