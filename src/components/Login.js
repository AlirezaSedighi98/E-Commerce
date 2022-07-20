import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { getUserInfo } from '../action';



export default function Login() {


  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [loginstate, setLoginstate] = useState({
      email: "",
      password: "",
      errorMessage: "",
      errorFlag: false,
      loading: false,
      invalidEmail: false,
      invalidPassword: false
  });


  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/




  const logingIn = async() => {
        window.scrollTo(500, 0);
        if(!loginstate.invalidEmail && !loginstate.invalidPassword && loginstate.email !== "" && loginstate.password !== ""){
            setLoginstate((last)=>{
                return {...last, loading: true}
            })
            try {
                const {data} = await axios.post("http://5.161.141.215:5000/api/users/login" , {
                email: loginstate.email,
                password: loginstate.password
            })
                localStorage.setItem('token',JSON.stringify(data.token))
                localStorage.setItem('password',JSON.stringify(loginstate.password))
                setLoginstate((last)=>({...last,errorFlag: false, errorMessage:""}))
                getUserInfo(dispatch , data.token)
                navigate("/")
            } catch (error) {
                window.scrollTo(500, 0);
                setLoginstate((last)=>{
                    return{...last, 
                        errorMessage: error.response.data.message, 
                        errorFlag:true,loading: false}
                });
            }
        }else{
            setLoginstate((last)=>{
                return{...last, 
                    errorMessage: "Please Fill The Form", 
                    errorFlag:true,loading: false}
            });
        }
        
        
    
}




  return (
    <div className='loginPage'>
      <form onSubmit={(e)=> (e.preventDefault())}>
          {loginstate.loading ? <div className="loader"></div> :
          
          <div className='loginContainer'>
                <h2 className='loginHeader'>
                    Login
                </h2>
                <div className='emailPassLogin'>
                    <p 
                        style={{display: loginstate.errorFlag ? "block" : "none" }} 
                        className='ErrorCause'
                    >
                        {loginstate.errorMessage}
                    </p>
                    <p className='loginEmail'>Email:</p>
                    <input 
                    className='emailPassInput'
                    type={'email'}
                    autoComplete="on"
                    onChange={(e)=>{
                        if(emailRegex.test(e.target.value)){
                            setLoginstate((last)=>{
                                return {...last, email: e.target.value,invalidEmail:false}
                            })
                        }else if(e.target.value === ""){
                            setLoginstate((last)=>{
                                return {...last, email: e.target.value,invalidEmail:false}
                            })

                        }
                        
                        else{
                            setLoginstate((last)=>{
                                return {...last,invalidEmail:true}
                            })
                        }
                        
                    }}
                    ></input>
                    <p 
                    className='inputError'
                    style={{display: loginstate.invalidEmail? "block" : "none"}}
                    >Invalid Email: example@example.example</p>
                    <p className='loginEmail'>Password:</p>
                    <input 
                    className='emailPassInput' 
                    type={'password'}
                    autoComplete="on"
                    onChange={(e)=>{
                        if(passwordRegex.test(e.target.value)){
                            setLoginstate((last)=>{
                                return {...last, password: e.target.value,invalidPassword:false}
                            })
                        }else if(e.target.value === ""){
                            setLoginstate((last)=>{
                                return {...last, password: e.target.value,invalidPassword:false}
                            })

                        }
                        
                        else{
                            setLoginstate((last)=>{
                                return {...last,invalidPassword:true}
                            })
                        }
                        
                    }}
                    ></input>
                    <p 
                    className='inputError'
                    style={{display: loginstate.invalidPassword? "block" : "none"}}
                    >Minimum eight characters, at least one letter and one number</p>
                </div>
                <div style={{display: "flex",alignItems: "center"}}>
                    <Link className='signinLogin' to={"/sign_in"}>Don't Have An Account?</Link>
                    <button 
                    className='loginButton' 
                    onClick={logingIn}
                    type='submit'>Login</button>   
                </div>
          </div>

          }
          
      </form>
    </div>
  );
}
