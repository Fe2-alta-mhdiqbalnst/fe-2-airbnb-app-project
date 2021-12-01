import './home.scss';
import { useState, useEffect } from 'react';
import a from '../../images/a.jpg';
import b from '../../images/b.jpg';
import c from '../../images/c.jpg';
import d from '../../images/d.jpg';
import facebook from '../../images/facebook.png';
import instagram from '../../images/instagram.png';
import twitter from '../../images/twitter.png';

const Home = () => {
 
  return (
    <>
    <div className="container-top">
        <div className="image-top">
          <div div className="title-top">
            <h4>Belum punya tujuan? Kami bisa membantu Anda.</h4>
            <button className="list"><p>Perjalanan untuk anda</p></button>
          </div>
        </div>
    </div>
    <div className="bg-mid">
      <div className="container-mid">
        <h2>Jelajahi sekitar</h2>
        <div className="c-box">
          <div className="in-box">
            <picture><img src={a} alt="a" /></picture>
              <h3>Jakarta </h3>
              <span>DKI Jakarta</span>
          </div>
          <div className="in-box">
            <picture><img src={b} alt="b" /></picture>
              <h3>Medan</h3>
              <span>Sumatera Utara</span>
          </div>
          <div className="in-box">
            <picture><img src={c} alt="c" /></picture>
              <h3>Surabaya </h3>
              <span>Jawa Timur</span>
          </div>
          <div className="in-box">
            <picture><img src={d} alt="d" /></picture>
              <h3>Padang </h3>
              <span>Sumatera Barat</span>
          </div>
        </div>
      </div>
    </div>

    <div className="container-3">
      <div className="in-container-3">
          <div className="c-title-3">
            <h1>Coba menerima tamu</h1>
            <h5>Dapatkan penghasilan tambahan dan temukan peluang baru dengan menyewakan tempat Anda</h5>
            <button>Pelajari lebih lanjut</button>
          </div>
      </div>
    </div>

    <footer>
      
      <p>© 2021 Airbnb, Inc</p>
      <div className="footer-img">
      <img src={facebook} alt="facebook" width="25px" />
      <img src={instagram} alt="instagram" width="25px" />
      <img src={twitter} alt="twitter" width="25px" />
      </div>
     
    </footer>
    </>
  )
}

export default Home;