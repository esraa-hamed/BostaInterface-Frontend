import React, { useState, useEffect } from 'react' ;
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './bosta_icon_eng.svg';
import logo2 from './bosta_icon_arab.svg';
import './Navbar.css';

function Navbar() {

    const [arabic, setArabic] = useState(0);
    const [params, setParams] = useState([]);
    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect(( ) => {
        const urlSearchString = window.location.href;
        const params = new URLSearchParams(urlSearchString);
        var arr = urlSearchString.split('/');
        if(arr[3]=='ar-eg'){
            setArabic(1);
        }
        else{
            setArabic(0);
        }
         }, [arabic]);

    const switchLanguage = () => {
        // setArabic(!arabic);
        if(arabic){
            setArabic(0);
            navigate('/en-eg/home');
        }
        else{
            setArabic(1);
            navigate('/ar-eg/home')
        }
    }

    const handleArLogoClick = () => {
        navigate('/ar-eg/home')
    }

    const handleEngLogoClick = () => {
        navigate('/en-eg/home');
    }

  return (  
    <div>
        {arabic ? (
            <nav className="NavbarItems-ar">
            <img src={logo2} alt="" className='nav-logo-ar' onClick={handleArLogoClick}/>
            <ul className="nav-menu">
                <li className="nav-item">
                    <a className="nav-link" href="/ar-eg/home">
                             الرئيسية
                    </a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/prices">
                             الأسعار
                    </a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/sales">
                             كلم المبيعات
                    </a> 
                </li>
                <li className="nav-item-track-ar">
                    <a className="nav-link-track-ar" href="/ar-eg/tracking">
                             تتبع شحنتك
                    </a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signin">
                             تسجيل الدخول
                    </a> 
                </li>
                <li className="nav-item">
                    <button className="nav-link-lang" onClick={switchLanguage}>
                             ENG
                    </button> 
                </li>
            </ul>
        </nav>
        ) : 
        (<nav className="NavbarItems">
            <img src={logo} alt="" className='nav-logo' onClick={handleEngLogoClick}/>
            <ul className="nav-menu">
                <li className="nav-item">
                    <a className="nav-link" href="/">
                             Main
                    </a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/prices">
                             Prices
                    </a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/sales">
                             Call Sales
                    </a> 
                </li>
                <li className="nav-item-track">
                    <a className="nav-link-track" href="/en-eg/tracking">
                             Track Shipment
                    </a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signin">
                             Sign In
                    </a> 
                </li>
                <li className="nav-item">
                    <button className="nav-link-lang" onClick={switchLanguage}>
                             عربي
                    </button> 
                </li>
            </ul>
        </nav>)}
    </div>
  );
}

export default Navbar;