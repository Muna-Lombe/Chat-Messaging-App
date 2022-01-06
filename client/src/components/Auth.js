import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'universal-cookie/es6'


import signinImage from '../assets/signup.jpg'


const cookies = new Cookies();

const initialState = {
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    phoneNumber:"",
    avatarUrl:""
};

const Auth =  () => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false);
    const handleChange = (event) =>{
        setForm({...form, [event.target.name]: event.target.value});
    };
    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        const {fullName, username, password, phoneNumber, avatarUrl} = form;
        
        const URL = 'http://localhost:5000/auth';

        const { data: {token, userId, hashedPassword} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {fullName, username, password, phoneNumber, avatarUrl}
        );

        //COMMENT THIS SECTION OUT TO TEST LASTER//
        cookies.set('token', token);
        cookies.set('userId', userId);
        cookies.set('username', username);
        cookies.set('fullName', fullName);

        if(isSignup){
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarUrl', avatarUrl);
            cookies.set('hashedPassword', hashedPassword); 

        }
        /////////////////////////////////////////////
        
        // reload window
        window.location.reload();
    }

    const switchMode = ()=>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    return (
        <div className='auth__form-container'>
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? "Sign up" : "Sign In"}</p>
                    <form onSubmit={()=>{}}>
                        
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                name="fullName"
                                type="text"
                                placeholder="Full name"
                                onChange={handleChange} 
                                required
                                />
                            </div>
                            
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">User name</label>
                            <input 
                            name="username"
                            type="text"
                            placeholder="User name"
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <input 
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone number"
                                onChange={handleChange} 
                                required
                                />
                            </div>
                            
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarUrl">Avatar Url</label>
                                <input 
                                name="avatarUrl"
                                type="text"
                                placeholder="Avatar Url"
                                onChange={handleChange} 
                                required
                                />
                            </div>
                            
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input 
                            name="password"
                            type="password"
                            placeholder="Full name"
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={handleChange} 
                                required
                                />
                            </div>
                            
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button onClick={handleSubmit}>
                            {isSignup ? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? "Already have an account?"
                                : "Don't have an account?"
                            }
                            <span onClick={switchMode}>
                              {isSignup ? "Sign In" : "Sign Up"}
                            </span>

                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="Sign in" />
            </div>
            
        </div>
    )
}

export default Auth
