import React from 'react'
import { useState, useEffect } from 'react';
import './Stepper-Ar.css'
import create_icon from './created.png'
import receive_icon from './received.png'
import deliver_icon from './delivered.png'
import onway_icon from './delivering.png'
import checkmark from './checkmark2.png'
import checkmarkR from './checkmark3.png'

const StepperAr = ({oneSuccess, twoSuccess, threeSuccess, fourSuccess, oneProcess, twoProcess, threeProcess, fourProcess, cancel, cancelStep, cancelReason}) => {
const steps = ['تم انشاء الشحنة', ' تم استلام الشحنة ', 'الشحنة خرجت للتسليم', 'تم تسليم الشحنة'];


return(
    <div>
        {cancel ? (
            <div>
            {
                (1==cancelStep) ? (
                    <div className='div_stepper_ar'>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_ar' style={{border:'solid red' ,backgroundColor:'red'}}><img src={create_icon} className='img_stepper'/></div>
                    <p className='p_step_ar_success'>{steps[0]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_ar' style={{marginLeft:'35px'}}><img src={receive_icon} className='img_stepper'/></div>
                    <p className='p_step_ar'>{steps[1]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_ar' style={{marginLeft:'20px'}}><img src={onway_icon} className='img_stepper'/></div>
                    <p className='p_step_ar'>{steps[2]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_last_ar' style={{marginLeft:'10px'}}><img src={deliver_icon} className='img_stepper'/></div>
                    <p className='p_step_ar'>{steps[3]}</p>
                    </div>
                    </div>
                ) : (<div></div>)
            }
            {
                (2==cancelStep) ? (
                    <div className='div_stepper_ar'>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_cancel_ar'><img src={checkmarkR} className='img_stepper'/></div>
                    <p className='p_step_ar_success'>{steps[0]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_ar' style={{border:'solid red', marginRight:'35px', backgroundColor:'red'}}><img src={receive_icon} className='img_stepper'/></div>
                    <p className='p_step_ar_success'>{steps[1]}</p>
                    <p className='p_cancel_reason_ar'>{cancelReason}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_ar' style={{marginLeft:'20px'}}><img src={onway_icon} className='img_stepper'/></div>
                    <p className='p_step_ar'>{steps[2]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_last_ar' style={{marginLeft:'10px'}}><img src={deliver_icon} className='img_stepper'/></div>
                    <p className='p_step_ar'>{steps[3]}</p>
                    </div>
                    </div>
                ) : (<div></div>)
            }
            {
                (3==cancelStep) ? (
                    <div className='div_stepper_ar'>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_cancel_ar'><img src={checkmarkR} className='img_stepper'/></div>
                    <p className='p_step_ar_success'>{steps[0]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_cancel_ar' style={{marginLeft:'35px'}}><img src={checkmarkR} className='img_stepper'/></div>
                    <p className='p_step_ar_success'>{steps[1]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_ar' style={{border:'solid red', marginLeft:'20px', backgroundColor:'red'}}><img src={onway_icon} className='img_stepper'/></div>
                    <p className='p_step_ar'>{steps[2]}</p>
                    <p className='p_cancel_reason_ar'>{cancelReason}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_last_ar' style={{marginLeft:'10px'}}><img src={deliver_icon} className='img_stepper'/></div>
                    <p className='p_step_ar'>{steps[3]}</p>
                    </div>
                    </div>
                ) : (<div></div>)
            }
            {
                (4==cancelStep) ? (
                    <div className='div_stepper_ar'>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_cancel_ar'><img src={checkmarkR} className='img_stepper'/></div>
                    <p className='p_step_ar_success'>{steps[0]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_cancel_ar' style={{marginLeft:'35px'}}><img src={checkmarkR} className='img_stepper'/></div>
                    <p className='p_step_ar_success'>{steps[1]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_cancel_ar' style={{marginLeft:'20px'}}><img src={checkmarkR} className='img_stepper'/></div>
                    <p className='p_step_ar_success'>{steps[2]}</p>
                    </div>
                    <div className='div_counter_step_ar'>
                    <div className='div_counter_last_ar' style={{border:'solid red', marginLeft:'10px', backgroundColor:'red'}}><img src={deliver_icon} className='img_stepper'/></div>
                    <p className='p_step_ar'>{steps[3]}</p>
                    <p className='p_cancel_reason_ar'>{cancelReason}</p>
                    </div>
                    </div>
                ) : (<div></div>)
            }
    </div>
        ):(
                <div className='div_stepper_ar'>
            {oneSuccess ? (
                <div className='div_counter_step_ar'>
                <div className='div_counter_ar_success'><img src={checkmark} className='img_stepper'/></div>
                <p className='p_step_ar_success'>{steps[0]}</p>
                </div>
            ) : (
                <div className='div_counter_step_ar'>
                <div className='div_counter_ar' style={oneProcess?({border:'solid green'}):({border:'solid rgba(108, 108, 108, 0.591)'})}><img src={create_icon} className='img_stepper'/></div>
                <p className='p_step_ar'>{steps[0]}</p>
                </div>
            )}

            {twoSuccess ? (
                <div className='div_counter_step_ar'>
                <div className='div_counter_ar_success' style={{marginRight:'45px'}}><img src={checkmark} className='img_stepper'/></div>
                <p className='p_step_ar_success'>{steps[1]}</p>
                </div>
            ) : (
                <div className='div_counter_step_ar'>
                <div className='div_counter_ar' style={twoProcess?({border:'solid green', marginRight:'45px'}):({border:'solid rgba(108, 108, 108, 0.591)', marginRight:'35px'})}><img src={receive_icon} className='img_stepper'/></div>
                <p className='p_step_ar'>{steps[1]}</p>
                </div>
            )}

            {threeSuccess ? (
                <div className='div_counter_step_ar'>
                <div className='div_counter_ar_success' style={{marginRight:'40px'}}><img src={checkmark} className='img_stepper'/></div>
                <p className='p_step_ar_success'>{steps[2]}</p>
                </div>
            ) : (
                <div className='div_counter_step_ar'>
                <div className='div_counter_ar' style={threeProcess?({border:'solid green', marginRight:'40px'}):({border:'solid rgba(108, 108, 108, 0.591)', marginRight:'20px'})}><img src={onway_icon} className='img_stepper'/></div>
                <p className='p_step_ar'>{steps[2]}</p>
                </div>
            )}

            {fourSuccess ? (
                <div className='div_counter_step_ar'>
                <div className='div_counter_last_ar_success' style={{marginRight:'40px'}}><img src={checkmark} className='img_stepper'/></div>
                <p className='p_step_ar_success'>{steps[3]}</p>
                </div>
            ):(
                <div className='div_counter_step_ar'>
                <div className='div_counter_last_ar' style={fourProcess?({border:'solid green', marginRight:'40px'}):({border:'solid rgba(108, 108, 108, 0.591)', marginRight:'10px'})}><img src={deliver_icon} className='img_stepper'/></div>
                <p className='p_step_ar'>{steps[3]}</p>
                </div>
            )}
            </div>
        )}
    </div>
)
};

export default StepperAr;