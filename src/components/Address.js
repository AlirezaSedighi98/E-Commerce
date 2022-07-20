import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';

export default function Address() {

    const order = useSelector(state=> state.order)

    const addressRegex = /^[a-zA-Z0-9\s,'-]{8,}$/

    const phoneRegex = /^\d{10}$/

    const cityRegex = /^[a-zA-Z',.\s-]{1,25}$/

    const postalCodeRegex = /^\d{7}$/

    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        invalidAddress: false,
        invalidCity: false,
        invalidPostalCode: false,
        invalidPhone: false,
        errorMessage: "",
        errorFlag: false
    });

    function saveAddress() {
        window.scrollTo(500, 0);
        if(!shippingAddress.invalidAddress 
            && !shippingAddress.invalidCity 
            && !shippingAddress.invalidPhone
            && !shippingAddress.invalidPostalCode
            && shippingAddress.address !== ""
            && shippingAddress.city !== ""
            && shippingAddress.phone !== ""
            && shippingAddress.postalCode !== ""
        ){
            dispatch({type: "addAddressToOrder", payload: shippingAddress})
            dispatch({type:"checkOut"})
            navigate("/checkout")
        }else{
            setShippingAddress((last)=>{
                return {...last,
                    errorFlag: true,
                    errorMessage: "Please Fill The Form"
                }
            })
        }
        
    }

  return (
    <div className='loginPage'>
        <form onSubmit={(e)=> (e.preventDefault())}>
            <div  className='loginContainer'>
                <h2  className='loginHeader'>
                    Address Info
                </h2>
                <p 
                style={{display: shippingAddress.errorFlag ? "block" : "none" }} 
                className='ErrorCause'
                >
                    {shippingAddress.errorMessage}
                </p>
                <div className='emailPassLogin'>
                    <p className='loginEmail'>Address:</p>
                    <input 
                    type={'text'} 
                    className={'emailPassInput'}
                    autoComplete="on"
                    onChange={(e)=>{
                        if(addressRegex.test(e.target.value)){
                            setShippingAddress((last)=>{
                                return{...last, address: e.target.value, invalidAddress:false}
                            })
                        }else if(e.target.value === ""){
                            setShippingAddress((last)=>{
                                return {...last, address: e.target.value, invalidAddress:false}
                            })
                        }else{
                            setShippingAddress((last)=>{
                                return {...last, invalidAddress:true}
                            })
                        }
                    }}
                    >
                    </input>
                    <p 
                    className='inputError'
                    style={{display: shippingAddress.invalidAddress ? "block" : "none"}}
                    >
                        Invalid Address:
                        address should be more than 8 characters and not have forbidden characters
                    </p>
                    <p className='loginEmail'>City:</p>
                    <input 
                    type={'text'} 
                    className={'emailPassInput'}
                    autoComplete="on"
                    onChange={(e)=>{
                        if(cityRegex.test(e.target.value)){
                            setShippingAddress((last)=>{
                                return{...last, city: e.target.value, invalidCity:false}
                            })
                        }else if(e.target.value === ""){
                            setShippingAddress((last)=>{
                                return {...last, city: e.target.value , invalidCity:false}
                            })
                        }else{
                            setShippingAddress((last)=>{
                                return {...last, invalidCity:true}
                            })
                        }
                    }}
                    >
                    </input>
                    <p 
                    className='inputError'
                    style={{display: shippingAddress.invalidCity ? "block" : "none"}}
                    >
                        Invalid City:
                        city should be 1-25 characters and not have forbidden characters
                    </p>
                    <p className='loginEmail'>Phone:</p>
                    <input 
                    type={'text'} 
                    className={'emailPassInput'}
                    autoComplete="on"
                    onChange={(e)=>{
                        if(phoneRegex.test(e.target.value)){
                            setShippingAddress((last)=>{
                                return{...last, phone: e.target.value, invalidPhone:false}
                            })
                        }else if(e.target.value === ""){
                            setShippingAddress((last)=>{
                                return {...last, phone: e.target.value, invalidPhone:false}
                            })
                        }else{
                            setShippingAddress((last)=>{
                                return {...last, invalidPhone:true}
                            })
                        }
                    }}
                    >
                    </input>
                    <p 
                    style={{display: shippingAddress.invalidPhone ? "block" : "none"}}
                    className='inputError'>
                        example:
                        9188805149 
                    </p>
                    <p className='loginEmail'>Postal Code:</p>
                    <input 
                    type={'text'} 
                    className={'emailPassInput'}
                    autoComplete="on"
                    onChange={(e)=>{
                        if(postalCodeRegex.test(e.target.value)){
                            setShippingAddress((last)=>{
                                return{...last, postalCode: e.target.value, invalidPostalCode:false}
                            })
                        }else if(e.target.value === ""){
                            setShippingAddress((last)=>{
                                return {...last, postalCode: e.target.value, invalidPostalCode:false}
                            })
                        }else{
                            setShippingAddress((last)=>{
                                return {...last, invalidPostalCode:true}
                            })
                        }
                    }}
                    >
                    </input>
                    <p
                    style={{display: shippingAddress.invalidPostalCode ? "block" : "none"}} 
                    className='inputError'>7 Digits !</p>
                    <div>
                    <button 
                        className='loginButton' 
                        onClick={()=>{
                            dispatch({type: "cart"})
                            navigate("/cart")
                        }}
                        type='button'>Edit Cart</button> 
                        <button 
                        style={{width: "85px"}}
                        className='loginButton' 
                        onClick={saveAddress}
                        type='button'>Next</button> 
                    </div>
                </div>
            </div>

        </form>
      
    </div>
  );
}
