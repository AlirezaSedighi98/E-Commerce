import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import Products from './Products';

export default function Home() {

  const [search, setSearch] = useState("");

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: "cart"})
  }, []);

  return (
    <div>
      <div className='websiteCover'>
        <div id='coverP'>
          <p id='coverP1' >Every Purchase</p>
          <p id='coverP2' >Will Be Made</p>
          <p id='coverP3' >With Pleasure</p>
        </div>
        <img id='coverImg' src='./images/photo-collage.png'/>
      </div>
      <div className='main'>
        <div id='listOfProducts'>
          <h5 style={{margin: "0", marginRight: "auto"}}>
            <img style={{height: "20px", marginRight: "10px"}} src='./images/product-512.png'/>
            Products
          </h5>
          <input onChange={(e)=>setSearch(e.target.value)} id='searchBar' type={'search'} placeholder={"Search :"}>
          </input>
        </div>
        <Products search={search}/>
      </div>
    </div>
  );
}
