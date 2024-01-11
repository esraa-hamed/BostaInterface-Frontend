import React, { useState, useEffect } from 'react' ;
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import './TrackDetails.css';
import Stepper from '../../components/Stepper/Stepper';
import reportImg from './reportImg.svg'

function TrackDetails() {
//   const [trackNum, setTrackNum] = useState(0);
  const {state} = useLocation();
  const {trackNum} = state;

  const [currentState, setCurrentState] = useState('');
  const [transitEvents, setTransitEvents] = useState([]);
  const [lastTimeStep, setLastTimeStep] = useState('');
  const [promisedDate, setPromisedDate] = useState('');
  const [branchName, setBranchName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [oneSuccess, setOneSuccess] = useState(0);
  const [twoSuccess, setTwoSuccess] = useState(0);
  const [threeSuccess, setThreeSuccess] = useState(0);
  const [fourSuccess, setFourSuccess] = useState(0);

  const [oneProcess, setOneProcess] = useState(0); 
  const [twoProcess, setTwoProcess] = useState(0);
  const [threeProcess, setThreeProcess] = useState(0);
  const [fourProcess, setFourProcess] = useState(0);

  const [cancel, setCancel] = useState(0); 
  const [cancelReason, setCancelReason] = useState(''); 
  const [cancelStep, setCancelStep] = useState(0); 

  const [threePostpone, setThreePostpone] = useState(0);
  const [fourPostpone, setFourPostpone] = useState(0);

  const convertTransitEvents = (events_list) => {
    events_list.map((eventItem) => {
        const date_time = eventItem['timestamp'].split('T');
        const date = date_time[0];
        const time = date_time[1];
        const time_split = time.split('.')[0];
        const h_m_s = time_split.split(':');
        const hour = h_m_s[0];
        const min = h_m_s[1];
        const sec = h_m_s[2];
        let time_string;
        let h;
        if(hour==12){
            time_string="12"+":"+min+" pm";
        }
        else if(hour==24){
            time_string="12"+":"+min+" am";
        }
        else if(hour>12){
            h = hour - 12;
            time_string=h+":"+min+" pm";
        }
        else{
            time_string=hour+":"+min+" am";
        }
        const y_m_d = date.split('-');
        const year = y_m_d[0];
        const month = y_m_d[1];
        const day = y_m_d[2];
        eventItem['timestamp']=time_string;
        eventItem['date']=day+"/"+month+"/"+year;
        
        const state_list = eventItem['state'].split('_');
        let i = 0;
        let str='';
        while(i<state_list.length){
            str+=state_list[i].toLowerCase();
            str+=" ";
            i++;
        }
        eventItem['details']=str;
        console.log(eventItem['details']);
    })
  }

  const convertDate = (date_param) => {
    const date_time = date_param.split('T');
    const date = date_time[0];
    const y_m_d = date.split('-');
    console.log(y_m_d);
    const year = y_m_d[0];
    const month = y_m_d[1];
    const day = y_m_d[2];
    let m;
    if(month=='01'){
        m='January';
    }
    else if(month=='02'){
        m='February';
    }
    else if(month=='03'){
        m='March';
    }
    else if(month=='04'){
        m='April';
    }
    else if(month=='05'){
        m='May';
    }
    else if(month=='06'){
        m='June';
    }
    else if(month=='07'){
        m='July';
    }
    else if(month=='08'){
        m='August';
    }
    else if(month=='09'){
        m='September';
    }
    else if(month=='10'){
        m='October';
    }
    else if(month=='11'){
        m='November';
    }
    else if(month=='12'){
        m='December';
    }
    console.log(day+" "+m+" "+year);
    setPromisedDate(day+" "+m+" "+year);
  }

  const convertTimeStep = (time_param) => {
    const date_time = time_param.split('T');
                const date = date_time[0];
                const time = date_time[1];
                const time_split = time.split('.')[0];
                const h_m_s = time_split.split(':');
                const hour = h_m_s[0];
                const min = h_m_s[1];
                const sec = h_m_s[2];
                let time_string;
                let h;
                if(hour==12){
                    time_string="12"+":"+min+" pm";
                }
                else if(hour==24){
                    time_string="12"+":"+min+" am";
                }
                else if(hour>12){
                    h = hour - 12;
                    time_string=h+":"+min+" pm";
                }
                else{
                    time_string=hour+":"+min+" am";
                }
                const y_m_d = date.split('-');
                const year = y_m_d[0];
                const month = y_m_d[1];
                const day = y_m_d[2];
                console.log(day+"/"+month+"/"+year+" at "+time_string);
                setLastTimeStep(day+"/"+month+"/"+year+" at "+time_string);
  }

  useEffect(()=>{
    axios.get('https://tracking.bosta.co/shipments/track/'+trackNum).then((response)=>{
        setCurrentState(response.data['CurrentStatus']['state']);
        convertTransitEvents(response.data['TransitEvents']);
        setTransitEvents(response.data['TransitEvents']);
        if(response.data['PromisedDate']){
            convertDate(response.data['PromisedDate']);
        }
        // setPromisedDate(response.data['PromisedDate']);
        if(response.data['CurrentStatus']['timestamp']){
            convertTimeStep(response.data['CurrentStatus']['timestamp']);
        }
        // setLastTimeStep(response.data['CurrentStatus']['timestamp']);
        setBranchName('Nasr City');
        setDeliveryAddress('53 Abo El Feda Street, Zamalek');
    }).catch((err)=>{
        console.log(err);
    });
    }, [])

    useEffect(()=>{
        let i =0;
        let currentStep = 1;
        while(i<transitEvents.length){
            if(transitEvents[i]['state']=='TICKET_CREATED'){
                setOneSuccess(1);
                setTwoProcess(1);
                currentStep=2;
            }
            if(transitEvents[i]['state']=='PACKAGE_RECEIVED'){
                setTwoSuccess(1);
                setThreeProcess(1);
                currentStep=3;
            }
            if(transitEvents[i]['state']=='OUT_FOR_DELIVERY'){
                setThreeSuccess(1);
                setFourProcess(1);
                currentStep=4;
            }
            if(transitEvents[i]['state']=='DELIVERED'){
                setFourSuccess(1);
            }
            if(transitEvents[i]['state']=='WAITING_FOR_CUSTOMER_ACTION'){
                if(currentStep==3){
                    setThreePostpone(1);
                }
                else{
                    setFourPostpone(1);
                }
            }
            if(transitEvents[i]['state']=='CANCELLED'){
                setCancel(1);
                setCancelStep(currentStep);
            }
            console.log(transitEvents[i]);
            i++;
        }
        }, [transitEvents])

  return (  
    <div className="Home">
        <div className='div_block'>
            <div className='div_col1'>
                <p>Shipment Number {trackNum}</p>
                {currentState=='DELIVERED' ? (<p className='p_delivered'>Shipment has been delivered</p>) : 
                (
                    currentState=='CANCELLED'?(<p className='p_cancelled'>Shipment has been cancelled</p>):(
                        <p className='p_bold'>{currentState}</p>
                    )
                )}
            </div>
            <div className='div_col2'>
            <p>Last Update</p>
            <p className='p_bold'>{lastTimeStep}</p>
            </div>
            <div className='div_col3'>
            <p>Shipper Name</p>
            <p className='p_bold'>SOUQ.COM</p>
            </div>
            <div className='div_col4'>
            <p> Delivery Date</p>
            <p className='p_bold'>{promisedDate}</p>
            </div>
        </div>
       <Stepper
        className='stepper_component'
        oneSuccess = {oneSuccess}
        twoSuccess={twoSuccess}
        threeSuccess={threeSuccess}
        fourSuccess={fourSuccess}
        oneProcess={oneProcess}
        twoProcess={twoProcess}
        threeProcess={threeProcess}
        fourProcess={fourProcess}
        cancel={cancel}
        cancelStep={cancelStep}
        cancelReason={"Order cancelled by supplier"}
       >
       </Stepper>

       <div className='div_lowerhalf'>
       <div className='div_lefthalf'>
       <p className='p_shipmentdetails'>Shipment Details</p>
       <div className='div_row1'>
       <div className='div_col1'>
       <p>Branch</p>
       </div>
       <div className='div_col2'>
       <p>Date</p>
       </div>
       <div className='div_col3'>
       <p>Time</p>
       </div>
       <div className='div_col4'>
       <p>Details</p>
       </div>
       </div>
       {transitEvents.map((tEvent) => (
        <div className='div_row'>
            <div className='div_col1'>
            <p>{branchName}</p>
            </div>
            <div className='div_col2'>
            <p>{tEvent['date']}</p>
            </div>
            <div className='div_col3'>
            <p>{tEvent['timestamp']}</p>
            </div>
            <div className='div_col4'>
            <p>{tEvent['details']}</p>
            </div>
        </div>
       ))}
       </div>

       <div className='div_righthalf'>
       <div className='div_thirdblock'>
       <p className='p_deliveryaddress'>Delivery Address</p>
       <div className='div_address'>
        <p className='p_bold'>{deliveryAddress}</p>
       </div>
       </div>
       <div className='div_fourthblock'>
        <p className='p_bold'>Is there a problem with your shipment?</p>
        <button className='button_report'>Report a problem</button>
        <img src={reportImg} className='img_report'></img>
       </div>
       </div>

       </div>
    </div>
  );
}

export default TrackDetails;