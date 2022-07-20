import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import ScrollToTop from './ScrollToTop';
import { Link,useNavigate } from 'react-router-dom';
import { getUserInfo } from '../action';

export default function SignIn() {


    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)

    const navigate = useNavigate()

    const [signIn, setSignIn] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
        errorFlag: false,
        loading: false,
        invaildEmail: false,
        invaildName: false,
        invaildPassword: false

    });


    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    const signMeUp = async() => {
        window.scrollTo(0, 0);
        if(!signIn.invaildEmail && !signIn.invaildName && !signIn.invaildPassword && signIn.email !== "" && signIn.name !== "" && signIn.password !== ""){
            if(signIn.password === signIn.confirmPassword){
                setSignIn((last)=>{
                   return {...last, loading: true}
                })
                try {
                    const {data} = await axios.post("http://5.161.141.215:5000/api/users" , {
                    name: signIn.name,
                    email: signIn.email,
                    password: signIn.password,
    
                })
                    
                    localStorage.setItem('token',JSON.stringify(data.token))
                    localStorage.setItem('password',JSON.stringify(signIn.password))
                    setSignIn((last)=>({...last,errorFlag: false, errorMessage:""}))
                    getUserInfo(dispatch , data.token)
                    navigate("/")
                } catch (error) {
                    window.scrollTo(0, 0);
                    setSignIn((last)=>{
                        return{...last, 
                            errorMessage: error.response.data.message, 
                            errorFlag:true,loading: false}
                    });
                }
                
            }
            else if(signIn.password !== signIn.confirmPassword){
                window.scrollTo(0, 0);
                setSignIn((last)=>{
                    return{...last, 
                        errorMessage: "Passwords Are Not Match", 
                        errorFlag:true}
                });
            }
        }else{
            window.scrollTo(0, 0);
            setSignIn((last)=>{
                return{...last, 
                    errorMessage: "Please Fill The Form", 
                    errorFlag:true}
            });
        }
        
    }






  return (
    <div className='loginPage'>
        
      <form onSubmit={(e)=> e.preventDefault()}>
          {signIn.loading ? <div className="loader"></div> :
          
          <div className='loginContainer'>
                <h2 className='loginHeader'>
                    Sign In
                </h2>
                <div className='emailPassLogin'>
                    <p 
                        style={{display: signIn.errorFlag ? "block" : "none" }} 
                        className='ErrorCause'
                    >
                        {signIn.errorMessage}
                    </p>
                    <p className='loginEmail'>Name:</p>
                    <input 
                        className='emailPassInput' 
                        type={'text'}
                        autoComplete="on"
                        onChange={(e)=>{
                            if(nameRegex.test(e.target.value)){
                                setSignIn((last)=>{
                                    return {...last, name: e.target.value.trim(),invaildName:false}
                                })
                            }else if(e.target.value === ""){
                                setSignIn((last)=>{
                                    return {...last, name: e.target.value ,invaildName:false}
                                })
                            }
                            else {
                                setSignIn((last)=>{
                                    return {...last,invaildName:true}
                                })
                            }
                            
                        }}
                    >    
                    </input>
                    <p 
                    className='inputError'
                    style={{display: signIn.invaildName? "block" : "none"}}
                    >Invalid Name : example [a-z]</p>
                    <p className='loginEmail'>Email:</p>
                    <input 
                        className='emailPassInput' 
                        type={'email'}
                        autoComplete="on"
                        onChange={(e)=>{
                            if(emailRegex.test(e.target.value)){
                                setSignIn((last)=>{
                                    return {...last, email: e.target.value,invaildEmail:false}
                                })
                            }else if(e.target.value === ""){
                                setSignIn((last)=>{
                                    return {...last,email: e.target.value ,invaildEmail:false}
                                })
                            }
                            else{
                                setSignIn((last)=>{
                                    return {...last,invaildEmail:true}
                                })
                            }
                            
                        }}
                    >    
                    </input>
                    
                    <p 
                    className='inputError'
                    style={{display: signIn.invaildEmail? "block" : "none"}}
                    >Invalid email : example@example.example</p>
                    <p className='loginEmail'>Password:</p>
                    <input 
                        className='emailPassInput' 
                        type={'password'}
                        autoComplete="on"
                        onChange={(e)=>{
                            if(passwordRegex.test(e.target.value)){
                                setSignIn((last)=>{
                                    return {...last, password: e.target.value,invaildPassword:false}
                                })
                            }else if(e.target.value === ""){
                                setSignIn((last)=>{
                                    return {...last,password: e.target.value ,invaildPassword:false}
                                })
                            }
                            else{
                                setSignIn((last)=>{
                                    return {...last,invaildPassword:true}
                                })
                            }
                            
                        }}
                    >    
                    </input>
                    <p 
                    className='inputError'
                    style={{display: signIn.invaildPassword? "block" : "none"}}
                    >Minimum eight characters, at least one letter and one number
                    </p>
                    <p className='loginEmail'>Confirm-Password:</p>
                    <input 
                        className='emailPassInput' 
                        type={'password'}
                        autoComplete="on"
                        onChange={(e)=>{
                            setSignIn((last)=>{
                                return {...last, confirmPassword: e.target.value}
                            })
                        }}
                    >    
                    </input>
                </div>
                <div style={{display: "flex",justifyContent: "center"}}>
                    <button 
                        className='loginButton' 
                        type='submit'
                        onClick={signMeUp}
                        
                        >
                    Sign In
                    </button>   
                </div>
          </div>
        
        }
          
      </form>
    </div>
  );
}
