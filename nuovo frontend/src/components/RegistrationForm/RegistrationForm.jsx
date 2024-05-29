import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import validate from './validate';
import axios from "axios";
import Logo from "../../assets/Logo.png"
import Slogan from "../../assets/Raggruppa 22.png"

import { useNavigate } from "react-router-dom";
import '../../App.css'

const RegistrationForm = () => {
    const navigate = useNavigate();

    const fetchLogin = async (value) => {
        const response = await axios.post(`http://localhost:3000/users/register`,value);
        const results = response.status;
        if (results == 200) {
            console.log('Form submitted:', value);
            navigate(`/home/${value.email}`)        
        }
    }
    const onSubmit = (value) => {
        fetchLogin(value)
    };
    return ( 
        //sfondo
        <div className="log_background">
        
            {/*logo*/}
            <img src={Logo} alt="Tomatime" className='logo_login' />
            {/*slogan e form */}
            <img src={Slogan} alt="time to focus for a break" className='slogan' />

        <div className='register'>
        <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, form }) => (
                <form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}} id='registrationForm'>
                    <h2>SIGN IN</h2>
                    <div className='line'>
                        <label htmlFor="Name"></label>
                        <Field name="Name">
                            {({ input, meta }) => (
                                <div>
                                    <input
                                        {...input}
                                        type="text"
                                        id="Name"
                                        placeholder={meta.error && meta.touched ? meta.error : 'Name'}
                                        className={meta.error && meta.touched ? 'error' : ''}
                                    />                                    
                                </div>
                            )}
                        </Field>
                    </div>
                    <div className='line'>
                        <label htmlFor="email"></label>
                        <Field name="email">
                            {({ input, meta }) => (
                                <div>
                                    <input
                                        {...input}
                                        type="email"
                                        id="email"
                                        placeholder={meta.error && meta.touched ? meta.error : 'Email'}
                                        className={meta.error && meta.touched ? 'error' : ''}
                                    />                                    
                                </div>
                            )}
                        </Field>
                    </div>
                    <div className='line'>
                        <label htmlFor="password"></label>
                        <Field name="password">
                            {({ input, meta }) => (
                                <div>
                                    <input
                                        {...input}
                                        type="password"
                                        id="password"
                                        placeholder={meta.error && meta.touched ? meta.error : 'Password'}
                                        className={meta.error && meta.touched ? 'error' : ''}
                                    />                                    
                                </div>
                            )}
                        </Field>
                    </div>
                    <div className='line'>
                        <label htmlFor="confirmPassword"></label>
                        <Field name="confirmPassword">
                            {({ input, meta }) => (
                                <div>
                                    <input
                                        {...input}
                                        type="password"
                                        id="confirmPassword"
                                        placeholder={meta.error && meta.touched ? meta.error : 'Confirm Password'}
                                        className={meta.error && meta.touched ? 'error' : ''}
                                    />                                    
                                </div>
                            )}
                        </Field>
                    </div>
                    <div className='checkbox'>
                        <label>
                            <Field name="newsletters" component="input" type="checkbox" />
                            Send me newsletters, tricks and updates
                        </label>
                    </div>
                    <button type="submit" style={{ opacity: form.getState().valid ? 1 : 0.5 }}>SIGN IN</button>
                    <p>Already have an Account? <a href="http://localhost:5173/login">Login Now</a></p>
                </form>
            )}
        />
        </div>
        </div>
    );
};

export default RegistrationForm;





