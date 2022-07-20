import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavDropdown } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { getUserInfo } from '../action';

export default function Header() {

  const [cartContent, setcartContent] = useState(0);

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const myCart = useSelector(state=> state.cart)

  const {user} = useSelector(state => state.user)
  const {errorUserFlag} = useSelector(state => state.user)

  function cart() {
    myCart.map((item)=>{
      return (setcartContent((last) => (last + item.qty)))
    })
  }

  useEffect(() => {
    cart()
    {localStorage.getItem('token') &&
      getUserInfo(dispatch,JSON.parse(localStorage.getItem('token')))

    }
    return () => {
      setcartContent(0)
    };
  }, [myCart]);
  
  return (
    <div className='header' >
      <Link style={{textDecoration: "none", color: "white", marginRight: "auto"}} to={"/"}>Home</Link>
      <Link  to={"/cart"}><img  id='cartIMG' src='/images/pngkey.com-cart-png-1169790.png'/>
        <div style={{display: cartContent === 0 ? "none" : ""}} id='cartPnum'>
          {cartContent}
        </div>
      </Link>
      { (!errorUserFlag && localStorage.getItem("token")) ? 
          <NavDropdown title={user.email} id='navEmail'>
            
            <NavDropdown.Item 
            id='changePassword' 
            onClick={()=>navigate("/orders")}
            >
             Orders
            </NavDropdown.Item>
            
            <NavDropdown.Item 
            id='changePassword' 
            onClick={()=>navigate("/setting")}>
              Change Password
            </NavDropdown.Item>

            <NavDropdown.Divider />
            
            <NavDropdown.Item 
            id='navDropDown'
            onClick={()=> {
              localStorage.removeItem('token')
              localStorage.removeItem('password')
              dispatch({type: "logedOut"})
              navigate("/")
            }}
            >
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
      :
          <Link style={{textDecoration: "none", color: "white"}} to={"/login"}>Login</Link>

      }
        
    </div>
  );
}
