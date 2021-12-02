import React, { useEffect } from 'react';
import { BrowserRouter/* , Route */, Routes } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';

import { useDispatch } from 'react-redux'
import allStore from './store/actions';
// import Home from './home';
// import Reservation from '../src/Reservation/Reservation.js'



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allStore.fetchPost())
  }, [dispatch])
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
        {/* <Route path="/" element={<Home/>} />
        <Route path="/detail/:id" element={<Reservation />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
