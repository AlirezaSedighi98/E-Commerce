import React from "react";
import "./App.css";
import Product from "./components/Product";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Setting from "./components/Setting";
import Address from "./components/Address";
import CheckOut from "./components/CheckOut";
import Orders from "./components/Orders";
import Order from "./components/Order";




function App() {

  const {user} = useSelector(state => state.user)
  const redLight = useSelector(state => state.redLight)



  return (
    <div >
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/*" element={<NotFound/>}/>
        <Route path="/products/:id" element={<Product/>}/>
        
        {(!localStorage.getItem("token")) &&
          <>
            <Route path="/login" element={<Login/>}/>
            <Route path="/sign_in" element={<SignIn/>}/>
          </>
        }
        
        <Route path="/cart" element={<Cart/>}/>

        { (redLight.address) &&
          <Route path="/address" element={<Address />}/>
        } 
        { (redLight.checkOut) &&
          <Route path="/checkout" element={<CheckOut />}/>
        }
        {(localStorage.getItem("token")) && 
        <>
          <Route path="/orders" element={<Orders />}/>
          <Route path="/orders/:id" element={<Order />}/> 
          <Route path="/setting" element={<Setting />}/>
        </>
        }
        
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
