import './my-homestay.scss';
import img from "../../images/a.jpg";
import CreateHomestay from "../create-homestay";
import UpdateHomestay from "../update-homestay";
import Swal from 'sweetalert2';
import axios from "axios";
import { useState, useEffect } from 'react';
import arrow from '../../images/next.png';
import allStoreList from "../../store/actionList";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const MyHomestay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector(({listPost}) => listPost);
  const [token, tokenUpdate]        = useState("");
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }

  useEffect(() => {
    dispatch(allStoreList.fetchPostList());
  }, [dispatch]);

  useEffect(() => {
    tokenUpdate(localStorage.getItem("token"));

    // axios.get('http://18.139.84.71/jwt/homestay/mine', config)
    // .then(({data}) => {
    //   updateList(data.Data)
    // })
  }, [token]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah kamu yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://18.139.84.71/jwt/homestay/${id}`, config)
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

if (list.Data === undefined) {return <></>}

  return (
    <>
    <div  className="c-my-homestay">
      <div className="page">
        <h3>My Homestay <span><img src={arrow} alt="next" width="25px" /><CreateHomestay/></span></h3> 
        {list.Data.map((el, i) => 
        <div className="list" key={i}> 
          <img src={el.Url} alt=""/>
          <div className="info-list">
            <p>{el.Name_Homestay}</p>
            <p>{el.Address}</p>
            <p>{el.Description}</p>
            <p>{`Rp.${el.Price}`}</p>
          </div>
          <div className="config">
          <div onClick={() => navigate(`/my-homestay/${el.ID}`)}><UpdateHomestay /></div>
          <button onClick={() => handleDelete(el.ID)}>Delete</button>
        </div>
        </div>
        )}
      </div>
    </div>
    </>
  )
}

export default MyHomestay;