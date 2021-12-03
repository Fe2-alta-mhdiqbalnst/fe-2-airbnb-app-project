import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './header/header';
// import Reservation from './view/Reservation/Reservation';

// import SignUp from './view/signUp';
// import SignIn from './view/signIn';
import Home from './view/home';
import Pay from './view/Reservation/Payments/App.jsx';

function App() {
  return (
<BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/payments" element={<Pay/>}/>
      {/* <Route path="/reservation-detail/:id" element={<Reservation />} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
