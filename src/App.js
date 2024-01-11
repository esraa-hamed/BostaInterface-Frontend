import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import HomeAr from './pages/Home-Ar/Home-Ar';
import Track from './pages/Track/Track';
import TrackAr from './pages/Track-Ar/Track-Ar';
import TrackDetails from './pages/TrackDetails/TrackDetails';
import TrackDetailsAr from './pages/TrackDetails-Ar/TrackDetails-Ar';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
        <Route exact path="/" element={<Home />}>
         </Route>
         <Route exact path="/en-eg/home" element={<Home />}>
         </Route>
         <Route exact path="/ar-eg/home" element={<HomeAr />}>
         </Route>
         <Route exact path="/en-eg/tracking" element={<Track />}>
         </Route>
         <Route exact path="/en-eg/trackingdetails" element={<TrackDetails />}>
         </Route>
         <Route exact path="/ar-eg/tracking" element={<TrackAr />}>
         </Route>
         <Route exact path="/ar-eg/trackingdetails" element={<TrackDetailsAr />}>
         </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
