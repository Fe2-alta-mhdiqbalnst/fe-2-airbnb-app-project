import './homestay-list.scss';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import allStore from "../../store/actions";
import arrow from '../../images/next.png'

const HomestayList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector(({listPost}) => listPost);

  useEffect(() => {
    dispatch(allStore.fetchPost());
  }, [dispatch]);

  const toReservasi = (id) => {
    navigate(`/homestay/${id}`);
  }

  if (posts.Data === undefined ) {return <></>}

  return (
    <>
    <div className="header-homestay">
      <div className="c-homestay"></div>
      <h2>Homestay List <span><img src={arrow} alt="arrow" width="25px" /></span></h2>
    </div>

    <div className="grid-container">
    {posts.Data.map((el, i) => 
    <div className="homestay" key={i} onClick={(e) => toReservasi(el.ID) }>
    <div className="grid-item" 
    style={{ 
      "backgroundImage": `url('${el.Url}')`,
      "backgroundPosition": "center",
      "backgroundSize": "cover"
     }}
    ></div>
    <label >
    <span>{el.Name_Homestay}</span>
    <span>{`Rp. ${el.Price}`}</span>
    </label>
    <span>{el.Address}</span>
    </div>
    )}
</div>
    </>
  )
}

export default HomestayList;