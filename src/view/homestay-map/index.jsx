import './homestay-map.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Pagination } from 'react-bootstrap';
import axios from "axios";
import img from '../../images/homestay2.jpg';


const HomestayMaps = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const [lat, latUpdate] = useState(null);
  const [long, longUpdate] = useState(null);
  const [list, listUpdate] = useState(null);

  useEffect(() => {
    let locationPathName = window.location.pathname;
    let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);

    axios.get(`http://18.139.84.71/homestay/address/${pathName}`)
    .then(({data}) => {
       
        latUpdate(data.Data[0].Latitude);
        longUpdate(data.Data[0].Longitude)
        listUpdate(data.Data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const toReservasi = (id) => {
    navigate(`/homestay/${id}`);
  }


  if(list === null){ return <></> }

  console.log(list);

  return (
    <>
    <div className="c-withmap">
      <div className="page-homestay">
        {list.map((el, i) => 
        <div className="list"> 
          <img src={el.Url} alt=""/>
          <div className="info-list">
            <p>{el.Name_Homestay}</p>
            <p>{el.Address}</p>
            <p>{`Rp.${el.Price} / Malam`}</p>
          </div>
        </div>
        )}
        <div className="pagination"> 
        <Pagination>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Next />
        </Pagination>
        </div>
      </div>
      <div id="map" className="page-map">
      <iframe title="maps" src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9488.49773320645!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1638703519135!5m2!1sen!2sid`} width="100%" height="843" style={{ border : "1px solid #d8d8d8" }}  allowfullscreen="" loading="lazy"></iframe>
            </div>


    </div>
    </>
  )
}

export default HomestayMaps;