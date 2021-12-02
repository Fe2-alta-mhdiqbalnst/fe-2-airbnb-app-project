import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './header/header';
import Home from './view/home';
import Homestay from './view/homestay-list';

function App() {
  return (
<BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homestay" element={<Homestay />} >
      <Route path="/homestay/:idroom" element={<Homestay />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
