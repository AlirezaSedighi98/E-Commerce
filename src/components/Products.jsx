import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { getProducts } from '../action';

export default function Products({search}) {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {listOfProducts} = useSelector(state => state.Products)
  const {errorFlag} = useSelector(state => state.Products)
  const {error} = useSelector(state => state.Products)

  useEffect(() => {
    getProducts(dispatch)
  }, []);

  return (
    <>
     <div className='products'>
      {errorFlag ? 
      <h1 className='error'>{error}</h1> 
      : listOfProducts.filter((item)=>{
        return item.name.toLowerCase().includes(search.toLowerCase())
      })
      .map((item, index)=>{
          return  <div 
            onClick={()=>navigate(`/products/${item._id}`,{state:  item._id})} 
            key={index} 
            className='ProductCard'>
                    <div className='imgContainer'>
                      <img className='ProductCardImg' src={item.image}/>
                    </div>
  
                    <div className='rateSection'>
                        <img style={{height: "20px"}} src='/images/star-images-9454.png'/>
                        <p>{item.rating}</p>
                    </div>
                    <p className='categoryName'>{item.category}</p>
                    <p className='NameOfProduct'>{item.name}</p>
                    <p className='Price'>$ {item.price}</p>
                  </div>
        })}
      
      
    </div>
    </>

    

  );
}
