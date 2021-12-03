import axios from 'axios';

export const fetchPost = () => {
  return (dispatch) => {
    axios.get("http://18.139.84.71/homestay") //server link dari backend
    .then(({data}) => {
      dispatch(setPost(data))
      console.log(data)
    })
    .catch((err) => {
      console.log(err);
    });
  };
};

export const setPost = (payload) => {
  return  {
    type: 'SET_POST',
    payload,
  }
} 