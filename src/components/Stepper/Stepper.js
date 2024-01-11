import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Stepper.css'
import create_icon from './created.png'
import receive_icon from './received.png'
import deliver_icon from './delivered.png'
import onway_icon from './delivering.png'
import checkmark from './checkmark2.png'
import checkmarkR from './checkmark3.png'

const Stepper = ({oneSuccess, twoSuccess, threeSuccess, fourSuccess, oneProcess, twoProcess, threeProcess, fourProcess, cancel, cancelStep, cancelReason}) => {
const steps = ['Shipment has been created', 'Shipment has been received', 'Shipment is out for delivery', 'Shipment has been delivered'];

return(
    <div>
        {cancel?(
        <div>
                {
                    (1==cancelStep) ? (
                        <div className='div_stepper'>
                        <div className='div_counter_step'>
                        <div className='div_counter' style={{border:'solid red' ,backgroundColor:'red'}}><img src={create_icon} className='img_stepper'/></div>
                        <p className='p_step_success'>{steps[0]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter' style={{marginLeft:'35px'}}><img src={receive_icon} className='img_stepper'/></div>
                        <p className='p_step'>{steps[1]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter' style={{marginLeft:'65px'}}><img src={onway_icon} className='img_stepper'/></div>
                        <p className='p_step'>{steps[2]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter_last' style={{marginLeft:'90px'}}><img src={deliver_icon} className='img_stepper'/></div>
                        <p className='p_step'>{steps[3]}</p>
                        </div>
                        </div>
                    ) : (<div></div>)
                }
                {
                    (2==cancelStep) ? (
                        <div className='div_stepper'>
                        <div className='div_counter_step'>
                        <div className='div_counter_cancel'><img src={checkmarkR} className='img_stepper'/></div>
                        <p className='p_step_success'>{steps[0]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter' style={{border:'solid red', marginLeft:'35px', backgroundColor:'red'}}><img src={receive_icon} className='img_stepper'/></div>
                        <p className='p_step_success'>{steps[1]}</p>
                        <p className='p_cancel_reason'>{cancelReason}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter' style={{marginLeft:'65px'}}><img src={onway_icon} className='img_stepper'/></div>
                        <p className='p_step'>{steps[2]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter_last' style={{marginLeft:'90px'}}><img src={deliver_icon} className='img_stepper'/></div>
                        <p className='p_step'>{steps[3]}</p>
                        </div>
                        </div>
                    ) : (<div></div>)
                }
                {
                    (3==cancelStep) ? (
                        <div className='div_stepper'>
                        <div className='div_counter_step'>
                        <div className='div_counter_cancel'><img src={checkmarkR} className='img_stepper'/></div>
                        <p className='p_step_success'>{steps[0]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter_cancel' style={{marginLeft:'35px'}}><img src={checkmarkR} className='img_stepper'/></div>
                        <p className='p_step_success'>{steps[1]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter' style={{border:'solid red', marginLeft:'65px', backgroundColor:'red'}}><img src={onway_icon} className='img_stepper'/></div>
                        <p className='p_step'>{steps[2]}</p>
                        <p className='p_cancel_reason'>{cancelReason}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter_last' style={{marginLeft:'90px'}}><img src={deliver_icon} className='img_stepper'/></div>
                        <p className='p_step'>{steps[3]}</p>
                        </div>
                        </div>
                    ) : (<div></div>)
                }
                {
                    (4==cancelStep) ? (
                        <div className='div_stepper'>
                        <div className='div_counter_step'>
                        <div className='div_counter_cancel'><img src={checkmarkR} className='img_stepper'/></div>
                        <p className='p_step_success'>{steps[0]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter_cancel' style={{marginLeft:'35px'}}><img src={checkmarkR} className='img_stepper'/></div>
                        <p className='p_step_success'>{steps[1]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter_cancel' style={{marginLeft:'65px'}}><img src={checkmarkR} className='img_stepper'/></div>
                        <p className='p_step_success'>{steps[2]}</p>
                        </div>
                        <div className='div_counter_step'>
                        <div className='div_counter_last' style={{border:'solid red', marginLeft:'90px', backgroundColor:'red'}}><img src={deliver_icon} className='img_stepper'/></div>
                        <p className='p_step'>{steps[3]}</p>
                        <p className='p_cancel_reason'>{cancelReason}</p>
                        </div>
                        </div>
                    ) : (<div></div>)
                }
        </div>):(
        <div className='div_stepper'>
            {oneSuccess ? (<div className='div_counter_step'>
            <div className='div_counter_success'><img src={checkmark} className='img_stepper'/></div>
            <p className='p_step_success'>{steps[0]}</p>
        </div>) 
        : (
            <div className='div_counter_step'>
            <div className='div_counter' style={oneProcess?({border:'solid green'}):({border:'solid rgba(108, 108, 108, 0.591)'})}><img src={create_icon} className='img_stepper'/></div>
            <p className='p_step'>{steps[0]}</p>
            </div>
        )}

        {twoSuccess ? (
            <div className='div_counter_step'>
            <div className='div_counter_success' style={{marginLeft:'45px'}}><img src={checkmark} className='img_stepper'/></div>
            <p className='p_step_success'>{steps[1]}</p>
            </div>
        ) : (
            <div className='div_counter_step'>
            <div className='div_counter' style={twoProcess?({border:'solid green', marginLeft:'45px'}):({border:'solid rgba(108, 108, 108, 0.591)', marginLeft:'35px'})}><img src={receive_icon} className='img_stepper'/></div>
            <p className='p_step'>{steps[1]}</p>
            </div>
        )}

        {threeSuccess ? (
            <div className='div_counter_step'>
            <div className='div_counter_success' style={{marginLeft:'90px'}}><img src={checkmark} className='img_stepper'/></div>
            <p className='p_step_success'>{steps[2]}</p>
            </div>
        ) : (
            <div className='div_counter_step'>
            <div className='div_counter' style={threeProcess?({border:'solid green', marginLeft:'90px'}):({border:'solid rgba(108, 108, 108, 0.591)', marginLeft:'65px'})}><img src={onway_icon} className='img_stepper'/></div>
            <p className='p_step'>{steps[2]}</p>
            </div>
        )}

        {fourSuccess ? (
            <div className='div_counter_step'>
            <div className='div_counter_last_success' style={{marginLeft:'130px'}}><img src={checkmark} className='img_stepper'/></div>
            <p className='p_step_success'>{steps[3]}</p>
            </div>
        ) : (
            <div className='div_counter_step'>
            <div className='div_counter_last' style={fourProcess?({border:'solid green', marginLeft:'130px'}):({border:'solid rgba(108, 108, 108, 0.591)', marginLeft:'90px'})}><img src={deliver_icon} className='img_stepper'/></div>
            <p className='p_step'>{steps[3]}</p>
            </div>
        )}
        </div>)}
    </div>
)
};

export default Stepper;