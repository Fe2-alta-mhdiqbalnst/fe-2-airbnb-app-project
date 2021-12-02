import axios from 'axios';

export const fetchPost = () => {
  return (dispatch) => {
    axios.get("https://jsonplaceholder.typicode.com/posts") //server link dari backend
    .then(({data}) => {
      dispatch(setPost(data))
      console.log(data);
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