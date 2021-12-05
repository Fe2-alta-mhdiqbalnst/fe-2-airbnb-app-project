import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './header/header';
import Home from './view/home';
import Homestay from './view/homestay-list';
import HomestayWithMap from './view/homestay-map';
import Myhomestay from './view/my-homestay';

function App() {
  return (
<BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homestay" element={<Homestay />} >
      <Route path="/homestay/:idroom" element={<Homestay />} />
      </Route>
      <Route path="/homestay-map/:city" element={<HomestayWithMap />} />
      <Route path="/my-homestay" element={<Myhomestay />} >
      <Route path="/my-homestay/:id" element={<Myhomestay />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
