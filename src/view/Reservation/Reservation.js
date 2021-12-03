import React, { useEffect, useState } from 'react';
import './Reservation.scss';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import a from '../../images/a.jpg';
import b from '../../images/b.jpg';
import c from '../../images/c.jpg';
import d from '../../images/d.jpg';
import allStore from '../../store/actions';
import { fetchPost } from '../../store/actions/fetchPost';

// import { fetchPost } from '../../store/actions/fetchPost';
// import { removeSelectedLocation } from './homestaySlice';

const Reservation = () => {
  const [detail, setDetail] = useState(null);
  const params = useParams();
  const posts = useSelector(({listPost}) => listPost);
  const dispatch = useDispatch();
  

  const [usersID, setUsersID] = useState('');
  const [homestayID, setHomestayID] = useState('');
  const [nameHomestay, setNameHomestay] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ciDate, setCIDate] = useState(Date);
  const [coDate, setCODate] = useState(Date);



  const submitCA = (e) => {
    e.preventDefault();
    if(!ciDate && !coDate) return alert('Please enter the right date!')
    // dispatch(fetchAsyncCA(ciDate));
    // dispatch(fetchAsyncCO(coDate));
  }

  const handleReserve = (e) => {
    e.preventDefault();
    // if(!usersID && !homestayID && !nameHomestay &&!startDate && !endDate) {
    //   alert('not found')
    // } else {
    //   console.log("masuk reservation checkout")
    // }
  }
  

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
    dispatch(allStore.fetchPost());
  },[dispatch])
  
  // useEffect(() => {
  //   const findDetail = posts.find(el => el.id === +params.id)
  //   setDetail(findDetail)
  // }, [params, posts])
  

  if(!posts.Data) {
    return <></>
  } else {
    console.log(posts.Data[0]["Name_Homestay"])
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
      </div>

      <section className="sec-left">
      <div className="facility-section">
        <h4>Enjoy Your Journey</h4>
        <h3>Facility</h3>
        {/* {data.id_facility} */}
      </div>

        <div className="check-availability">
          <p>Let's check this out!</p>
          <div className="date-available">
             <form>
              <p>CHECK-IN <span>:</span><input type="date" placeholder="dd/mm/yyyy" value={ ciDate } onChange={(e) => setCIDate(e.target.value)}/></p>
              <p className="line-color">CHECKOUT <span>:</span> <input type="date" placeholder="dd/mm/yyyy" value={ coDate } onChange={(e) => setCODate(e.target.value)}/></p>
              <button onClick={submitCA}>Check availability</button>
            </form>
          </div>
        </div>

        <div className="reservation-form">
          <h5>Reservation</h5>
          <div className="reservation-column">
            <form>
              <p className="line-color">User ID <span>:</span> {posts.Data["Name_Homestay"]}</p>
              <p>Homestay ID<span>:</span> {posts.Data["Name_Homestay"]}</p>
              <p className="line-color">Name <span>:</span> {posts.Data["Name_Homestay"]}</p>
              <div className="date-reserve">
              <p>Start Date <span>:</span><input type="date" placeholder="dd/mm/yyyy"/></p>
              <p className="line-color">End Date <span>:</span> <input type="date" placeholder="dd/mm/yyyy"/></p>
              </div>
              <p className="total-price">Total Price <span>: Rp.</span> {/*{total_harga}*/}</p>
              <button type="submit" onClick={() => handleReserve()}>Reserve</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reservation;



//useEffect 2 argumen, 1: funct, 2: array(boleh ga ada)

//arg2, array kosong sekali doang dia kana kepanggil ketika page render
// kalau ada isinya [dispatch cnth] setiap perubahan di dispatch dia akan kepanggil