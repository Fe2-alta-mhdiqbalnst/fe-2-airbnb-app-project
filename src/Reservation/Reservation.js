import React, { useEffect, useState } from 'react';
import './Reservation.scss';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import a from '../images/a.jpg';
import b from '../images/b.jpg';
import c from '../images/c.jpg';
import d from '../images/d.jpg';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const Reservation = ({google} = []) => {
  const [detail, setDetail] = useState(null);
  const params = useParams();
  const posts = useSelector(({listPost}) => listPost);


  // const [usersID, setUsersID] = useState('');
  // const [homestayID, setHomestayID] = useState('');
  // const [nameHomestay, setNameHomestay] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');

  // const handleReserve = () => {
  //   const body = {
  //     usersID,
  //     homestayID,
  //     nameHomestay,
  //     startDate,
  //     endDate,
  //   };

  //   setLoading(true);
  //   setErrMsg(null);
  //   setSuccessMsg(null);
  //   localStorage.clear();

  //   axios
  //     .post("", body)
  //     .then(() => {
  //       const body = {
  //         HomestayID,
  //         start_date,
  //         end_date,
  //       };
  //       return axios.post('', bodyReservation);
  //     })
  //     .then(({data}) => {
  //       setSuccessMsg(data.message);
  //       setUsersID(""),
  //       setHomestayID(""),
  //       setNameHomestay(""),
  //       setStartDate(""),
  //       setEndDate(""),
  //       localStorage.setItem("token", data.token);
  //     })
  //     .catch((err) => {
  //       setErrMsg(Err.response.data.message);
  //     })
  //     .finally(() => setLoading(false));
  // };

  //get detail

  useEffect(() => {
    const findDetail = posts.find(el => el.id === +params.id)
    setDetail(findDetail)
  }, [params, posts])

  if(!detail) {
    return <></>
  }
  
  return (
    <div className="reservation-section">
      <div className="main-section">
        <h1>Villa de Romarin {/* {data.name_homestay} */}</h1>
        <div className="data-pict">
          {/* <img src={data.Poster} alt={data.Title}/> */}
            <picture><img src={a} alt="a" /></picture>
            <picture><img src={b} alt="b" /></picture>
            <picture><img src={c} alt="c" /></picture>
            <picture><img src={d} alt="d" /></picture>
        </div>
        <div className="detail-section">
          <p>Description :</p>
          <p>Address :</p>
          <p>Latitude, Longitude</p>
          <p></p>
        </div>
        <Map google={google} zoom={14}>
  
          <Marker onClick={onMarkerClick}
                  name={'Current location'} />
  
          <InfoWindow onClose={onInfoWindowClose}>
              <div>
                <h1>{selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      </div>

      <section className="sec-left">
      <div className="facility-section">
        <h4>Enjoy Your Journey</h4>
        <h3>Facility</h3>
        {/* {data.id_facility} */}
      </div>

        <div className="reservation-form">
          <h5>Reservation</h5>
          <div className="reservation-column">
            <form>
              <p className="line-color">User ID <span>:</span> {detail.id}</p>
              <p>Homestay ID<span>:</span> {detail.id}</p>
              <p className="line-color">Name <span>:</span> {detail.id}</p>
              <p>Start Date <span>:</span>{/* {start_date} */}</p>
              <p className="line-color">End Date <span>:</span> {/* {end_date} */}</p>
              <p className="total-price">Total Price <span>:</span> {/*{total_harga}*/}</p>
              <button type="submit" /* onClick={() => handleReserve()} */>Reserve</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBbKJhUzwP2Vz-c06djfKSUgXTF757AakI")
})(Reservation)



//useEffect 2 argumen, 1: funct, 2: array(boleh ga ada)

//arg2, array kosong sekali doang dia kana kepanggil ketika page render
// kalau ada isinya [dispatch cnth] setiap perubahan di dispatch dia akan kepanggil