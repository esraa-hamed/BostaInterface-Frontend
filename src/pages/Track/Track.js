import React, { useState, useEffect } from 'react' ;
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Track.css';
import search_icon from './search.webp';
function Track() {
  const [trackNum, setTrackNum] = useState(0);
  const navigate = useNavigate();
    const handleImgClick = () => {
      axios.get('https://tracking.bosta.co/shipments/track/'+trackNum).then((response)=>{
        navigate('/en-eg/trackingdetails', {state: {trackNum: trackNum}});
      }).catch((err)=>{
          console.log(err);
          alert("No shipment with this number");
          return ;
      });
    }

    const handleInputChange = (e) => {
      setTrackNum(e.target.value);
    }

  return (  
    <div className="Home">
      <p className='p_track'>Track your shipment</p>
      <div className='div_track'>
      <input type='text' className='input_track' placeholder='Tracking No.' onChange={handleInputChange} onSubmit={handleImgClick}></input>
      <img src={search_icon} className='img_track' onClick={handleImgClick}/>
      </div>
    </div>
  );
}

export default Track;