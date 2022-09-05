import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'universal-cookie/es6'


import signinImage from '../assets/signup.jpg'


const cookies = new Cookies();
        
const s = sessionStorage.setItem.bind(sessionStorage)
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
        
        const { username, password, phoneNumber, avatarUrl} = form;
        
        const URL = 'http://localhost:5000/auth';

        const { data: {token, userId, hashedPassword, fullName, permissions, grants} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {fullName: form.fullName, username, password, phoneNumber, avatarUrl}
        );
        

        

        //COMMENT THIS SECTION OUT TO TEST LASTER//
        cookies.set('token', token);
        cookies.set('userId', userId);
        cookies.set('username', username);
        cookies.set('fullName', fullName);

        ////REMOVE THIS AFTER VERIFY TEST////////
        cookies.set('permissions', permissions);
        cookies.set('grants', grants);
        console.log("permissions: ", permissions)
        console.log("grants: ",grants)
        ////////////////////////////////////////

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
                    <div style={{"display":"flex", "flexDirection":"row","justifyContent":"space-between" }}>
                        <p>{isSignup ? "Sign up" : "Sign In"}</p>
                    </div>
                        
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
export const dc = (en)=>{
            const n = en.hash.toString().slice(en.hash.length-4, en.hash.length).split("#")
            const ex = en.hash.slice(Number.parseInt(n[0]), (Number.parseInt(n[0])+Number.parseInt(n[1])))
            // console.log("dehashed:",ex)
            return ex;
        }
export const FA =async () => {
        const URL = 'http://localhost:5000/auth';
        const { data: res } = await axios.get(`${URL}/fetchauthor`)
        cookies.set('atlas', res);
        s('atlas', res)
        
        return dc(res)
}
export default Auth
