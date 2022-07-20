import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { getProducts } from '../action';

export default function Setting() {


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {user} = useSelector(state => state.user)

    const [passwordstate, setPasswordstate] = useState({
        password: "",
        Newpassword: "",
        confirmPassword: "",
        errorMessage: "",
        errorFlag: false,
        successFlag: false,
        loading: false,
        invalidPassword: false,
        invalidNewPassword: false,
        invalidConfirmPassword: false,
        loading: false
    });

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    const changeThePassword = async() => {
        window.scrollTo(500, 0);
        if(passwordstate.Newpassword === passwordstate.confirmPassword && passwordstate.Newpassword !== ""){
            if(JSON.parse(localStorage.getItem('password')) === passwordstate.password){
                setPasswordstate((last)=> {
                    return{...last, loading: true}
                })
                try {
                    const {data} = await axios.put("http://5.161.141.215:5000/api/users/profile" ,{
                        name: user.name,
                        email: user.email,
                        password: passwordstate.Newpassword
                    },
                    {headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                      }}
                    )
                    localStorage.setItem('password', JSON.stringify(passwordstate.Newpassword))
                    setPasswordstate((last)=>{
                        return{...last,
                            errorFlag: false,
                            successFlag: true
                        }
                    })
                    setPasswordstate((last)=> {
                        return{...last, loading: false}
                    })
                    document.getElementById("myForm").reset()
                    
                } catch (error) {
                    setPasswordstate((last)=>{
                        return {...last, 
                            errorMessage: error.response.data.message,
                            errorFlag: true,
                            successFlag: false
                        }
                    })
                }
            }else{
                setPasswordstate((last)=>{
                    return {...last, 
                        errorMessage: "Old Password Incorrect!",
                        errorFlag: true,
                        successFlag: false
                    }
                })
            }
        }else if(passwordstate.Newpassword === "" || passwordstate.password === "" || passwordstate.confirmPassword === ""){
            setPasswordstate((last)=>{
                return {...last, 
                    errorMessage: "Please Fill The Form",
                    errorFlag: true,
                    successFlag: false
                }
            })
        }
        else{
            setPasswordstate((last)=>{
                return {...last, 
                    errorMessage: "New Passwords Are Not Match",
                    errorFlag: true,
                    successFlag: false
                }
            })
        }
        
    }


  return (
    <div className='loginPage'>
        <form id='myForm' onSubmit={(e)=> (e.preventDefault())}>
            {passwordstate.loading ? <div className="loader"></div> : 
            
            <div className='loginContainer'>
                    <h2 className='loginHeader'>
                        Change Password
                    </h2>
                    <div className='emailPassLogin'>
                            <p 
                            style={{display: passwordstate.errorFlag ? "block" : "none" }} 
                            className='ErrorCause'
                            >
                                {passwordstate.errorMessage}
                            </p>
                            <p 
                            style={{display: passwordstate.successFlag ? "block" : "none" , color: "#20c562"}} 
                            className='ErrorCause'
                            >
                                Your Password Successfully Changed
                            </p>
                            <p className='loginEmail'>Old Password:</p>
                            <input 
                            className='emailPassInput'
                            type={'password'}
                            autoComplete="on"
                            onChange={(e)=>{
                                if(passwordRegex.test(e.target.value)){
                                    setPasswordstate((last)=>{
                                        return {...last, password: e.target.value,invalidPassword:false}
                                        e.target.value = ""
                                    })
                                }else if(e.target.value === ""){
                                    setPasswordstate((last)=>{
                                        return {...last, password: e.target.value, invalidPassword:false}
                                    })
                                }else{
                                    setPasswordstate((last)=>{
                                        return {...last,invalidPassword:true}
                                    })
                                }
                            }}
                            ></input>
                            <p 
                            className='inputError'
                            style={{display: passwordstate.invalidPassword? "block" : "none"}}
                            >Minimum eight characters, at least one letter and one number</p>
                            <p className='loginEmail'>New Password:</p>
                            <input 
                            className='emailPassInput' 
                            type={'password'}
                            autoComplete="on"
                            onChange={(e)=>{
                                if(passwordRegex.test(e.target.value)){
                                    setPasswordstate((last)=>{
                                        return {...last, Newpassword: e.target.value,invalidNewPassword:false}
                                        e.target.value = ""
                                    })
                                }else if(e.target.value === ""){
                                    setPasswordstate((last)=>{
                                        return {...last, Newpassword: e.target.value ,invalidNewPassword:false}
                                    })
                                }else{
                                    setPasswordstate((last)=>{
                                        return {...last,invalidNewPassword:true}
                                    })
                                }
                            }}
                            ></input>
                            <p 
                            className='inputError'
                            style={{display: passwordstate.invalidNewPassword? "block" : "none"}}
                            >Minimum eight characters, at least one letter and one number</p>
                            <p className='loginEmail'>Confirm Password:</p>
                            <input 
                            className='emailPassInput' 
                            type={'password'}
                            autoComplete="on"
                            onChange={(e)=>{
                                if(passwordRegex.test(e.target.value)){
                                    setPasswordstate((last)=>{
                                        return {...last, confirmPassword: e.target.value,invalidConfirmPassword:false}
                                        
                                    })
                                    
                                }else if(e.target.value === ""){
                                    setPasswordstate((last)=>{
                                        return {...last,invalidConfirmPassword:false}
                                    })
                                }else{
                                    setPasswordstate((last)=>{
                                        return {...last,invalidConfirmPassword:true}
                                    })
                                }
                            }}
                            ></input>
                            <p 
                            className='inputError'
                            style={{display: passwordstate.invalidConfirmPassword? "block" : "none"}}
                            >Minimum eight characters, at least one letter and one number</p>
                        </div>
                        <div style={{display: "flex",justifyContent: "center"}}>
                            <button 
                            className='loginButton'
                            onClick={changeThePassword} 
                            type='submit'>Change Password</button>   
                        </div>
                </div>
            }
            
        </form>
        
      
    </div>
  );
}
