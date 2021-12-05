import './home.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import a from '../../images/a.jpg';
import facebook from '../../images/facebook.png';
import instagram from '../../images/instagram.png';
import twitter from '../../images/twitter.png';
import { useDispatch, useSelector } from 'react-redux';
import allStore from "../../store/actions";

const Home = () => {
 const navigate = useNavigate();

 const dispatch = useDispatch();
  const homestay = useSelector(({listPost}) => listPost);
  const [state, updateState] = useState(null);

  useEffect(() => {
    dispatch(allStore.fetchPost());
  }, [dispatch]);

  useEffect(() => {
    updateState(homestay);
  },[homestay])
    

 const toHomeStay = () => {
   navigate('/homestay');
 }
 
if (homestay.Data === undefined ) {return <></>}
if (state === null ) {return  <></>}
if (state.Data === undefined ) {return  <></>}
 
const address = state.Data.map((el) => el.Address);
const uniq = address.reduce(function(a,b){
  if (a.indexOf(b) < 0 ) a.push(b);
  return a;
},[]);
 
console.log(address);

  return (
    <>
    <div className="container-top">
        <div className="image-top">
          <div div className="title-top">
            <h4>Belum punya tujuan? Kami bisa membantu Anda.</h4>
            <button className="list" onClick={() => toHomeStay()}><p>Perjalanan untuk anda</p></button>
          </div>
        </div>
    </div>
    <div className="bg-mid">
      <div className="container-mid">
        <h2>Jelajahi sekitar</h2>
        <div className="c-box">
          {uniq.map((el) => 
          <div className="in-box" >
            <picture onClick={(e) => navigate(`/homestay-map/${el}`)}><img src={a} alt="a" /></picture>
              <h4 style={{ fontWeight : "bold" }}>{el}</h4>
              <span></span>
          </div>
         )}
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