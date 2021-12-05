import axios from 'axios';

export const fetchPostList = () => {

  const token = localStorage.getItem("token");
  const headers = {
    "Authorization": 'Bearer ' + token
};
  return (dispatch) => {
    axios.get("http://18.139.84.71/jwt/homestay/mine", {headers : headers}) //server link dari backend
    .then(({data}) => {
      dispatch(setPostList(data))
    })
    .catch((err) => {
      console.log(err);
    });
  };
};

export const setPostList = (payload) => {
  return  {
    type: 'SET_POST',
    payload,
  }
} 