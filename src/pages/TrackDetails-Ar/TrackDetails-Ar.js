import React, { useState, useEffect } from 'react' ;
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import './TrackDetails-Ar.css';
import StepperAr from '../../components/Stepper-Ar/Stepper-Ar'
import reportImg from './reportImg.svg'

function TrackDetailsAr() {
  const {state} = useLocation();
  const {trackNum} = state;

  const [currentState, setCurrentState] = useState('');
  const [currentStateAr, setCurrentStateAr] = useState('');
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

  const mapState = (state_param) => {
    let str;
        if(state_param=='CANCELLED'){
          str = 'تم الغاء الشحنة'
        }
        else if(state_param=='TICKET_CREATED'){
          str = 'تم انشاء الشحنة'
        }
        else if(state_param=='PACKAGE_RECEIVED'){
          str = 'تم استلام الشحنة'
        }
        else if(state_param=='IN_TRANSIT'){
          str = 'في مرحلة الانتقال'
        }
        else if(state_param=='NOT_YET_SHIPPED'){
          str = 'لم يتم شحنه بعد'
        }
        else if(state_param=='WAITING_FOR_CUSTOMER_ACTION'){
          str = 'في انتظار إجراء العملاء'
        }
        else if(state_param=='OUT_FOR_DELIVERY'){
          str = 'الشحنة خرجت للتسليم'
        }
        else if(state_param=='DELIVERED'){
          str = 'تم تسليم الشحنة'
        }
        else if(state_param=='DELIVERED_TO_SENDER'){
          str = 'سلمت إلى المرسل'
        }
        setCurrentStateAr(str);
  }

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
        
        let str;
        if(eventItem['state']=='CANCELLED'){
          str = 'تم الغاء الشحنة'
        }
        else if(eventItem['state']=='TICKET_CREATED'){
          str = 'تم انشاء الشحنة'
        }
        else if(eventItem['state']=='PACKAGE_RECEIVED'){
          str = 'تم استلام الشحنة'
        }
        else if(eventItem['state']=='IN_TRANSIT'){
          str = 'في مرحلة الانتقال'
        }
        else if(eventItem['state']=='NOT_YET_SHIPPED'){
          str = 'لم يتم شحنه بعد'
        }
        else if(eventItem['state']=='WAITING_FOR_CUSTOMER_ACTION'){
          str = 'في انتظار إجراء العملاء'
        }
        else if(eventItem['state']=='OUT_FOR_DELIVERY'){
          str = 'الشحنة خرجت للتسليم'
        }
        else if(eventItem['state']=='DELIVERED'){
          str = 'تم تسليم الشحنة'
        }
        else if(eventItem['state']=='DELIVERED_TO_SENDER'){
          str = 'سلمت إلى المرسل'
        }
        eventItem['details']=str;
        console.log(eventItem['details']);
    })
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
                m='يناير';
            }
            else if(month=='02'){
                m='فبراير';
            }
            else if(month=='03'){
                m='مارس';
            }
            else if(month=='04'){
                m='ابريل';
            }
            else if(month=='05'){
                m='مايو';
            }
            else if(month=='06'){
                m='يونيو';
            }
            else if(month=='07'){
                m='يوليو';
            }
            else if(month=='08'){
                m='أغسطس';
            }
            else if(month=='09'){
                m='سبتمبر';
            }
            else if(month=='10'){
                m='أكتوبر';
            }
            else if(month=='11'){
                m='نوفمبر';
            }
            else if(month=='12'){
                m='ديسمبر';
            }
            console.log(day+" "+m+" "+year);
            setPromisedDate(day+" "+m+" "+year);
  }

  useEffect(()=>{
    axios.get('https://tracking.bosta.co/shipments/track/'+trackNum).then((response)=>{
      setCurrentState(response.data['CurrentStatus']['state']);
      mapState(response.data['CurrentStatus']['state']);
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
      setBranchName('مدينة نصر');
      setDeliveryAddress('٥٣ ش ابو الفدا، الزمالك');
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
    <div className="Home-Ar">
      <div className='div_block_ar'>
            <div className='div_col1'>
                <p>رقم الشحنة {trackNum}
                </p>
                {currentState=='DELIVERED' ? (<p className='p_delivered'>تم تسليم الشحنة</p>) : 
                (
                  currentState=='CANCELLED'?(<p className='p_cancelled'>تم الغاء الشحنة</p>):
                  (<p className='p_bold'>
                    {currentStateAr}
                  </p>)
                )}
            </div>
            <div className='div_col2'>
            <p>اخر تحديث</p>
            <p className='p_bold'>{lastTimeStep}</p>
            </div>
            <div className='div_col3'>
            <p>اسم التاجر</p>
            <p className='p_bold'>SOUQ.COM</p>
            </div>
            <div className='div_col4'>
            <p> موعد التسليم خلال</p>
            <p className='p_bold'>{promisedDate}</p>
            </div>
        </div>
       <StepperAr
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
       cancelReason={"تم الغاء الشحنة من التاجر"}
       >
       </StepperAr>
       <div className='div_lowerhalf_ar'>
       <div className='div_lefthalf'>
       <p className='p_shipmentdetails_ar'>تفاصيل الشحنة</p>
       <div className='div_row1'>
       <div className='div_col1'>
       <p>الفرع</p>
       </div>
       <div className='div_col2'>
       <p>التاريخ</p>
       </div>
       <div className='div_col3'>
       <p>الوقت</p>
       </div>
       <div className='div_col4'>
       <p>تفاصيل</p>
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
            <div className='div_col3_ar'>
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
       <p className='p_deliveryaddress'>عنوان التسليم</p>
       <div className='div_address'>
        <p className='p_bold'>{deliveryAddress}</p>
       </div>
       </div>
       <div className='div_fourthblock'>
        <p className='p_bold'>هل يوجد مشكلة في شحنتك؟!</p>
        <button className='button_report'>إبلاغ عن مشكلة</button>
        <img src={reportImg} className='img_report_ar'></img>
       </div>
       </div>

       </div>
    </div>
  );
}

export default TrackDetailsAr;