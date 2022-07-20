import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route, useParams } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { getProduct } from '../action';
import { successAddProduct } from '../action';
import { AddSameProduct } from '../action';

export default function Product() {


    const {product} = useSelector(state => state.Product)

    const {productErrorFlag} = useSelector(state => state.Product)

    const myCart = useSelector(state => state.cart)

    const [filterlength, setFilterlength] = useState(0);
 
    const dispatch = useDispatch()

    const params = useParams()

    const {id} = params

    const [loading, setloading] = useState(true);
    const [addP, setAddP] = useState(false);


    useEffect(() => {
      getProduct(dispatch,id)
      return () => {
        setloading(false)
       };
    }, [product]);



    function addToCart () {
      if(!stockCheck){
        window.scrollTo(0, 0);
        setAddP(true)
      }
      myCart.filter((item)=>{
        return item._id === id
       }).length === 0 ? 
       successAddProduct(dispatch,product)
       :
       AddSameProduct(dispatch,id)
       
    }

    localStorage.setItem('cart',JSON.stringify(myCart)) 

    const stockCheck = (product.countInStock === 0 || myCart.filter((item)=>{
      return item._id === id && item.qty === item.countInStock       
    }).length > 0)

  return (
    <div className='productPage'>
      {loading ? 
        <div className='loginPage'>
            <div className="loader"></div>
        </div>
      :
      (productErrorFlag ? 
        <h1 className='productError'>
         Could Not Get Product Data!
        </h1>  
        :
          <div className='productInfo'>
            <div style={{display: "flex" , justifyContent: "center", gridColumnStart : 1 , gridColumnEnd: 3}}>
              <h3 className={addP  ? "alert" : "" }>
                { addP && "Product Added To Cart" }
              </h3>
            </div>
          <h1 className='name'>{product.name}</h1>
          <img className='imgOfProduct' src={product.image}/>
          <div className='detailOfProduct'>
            <p className='categoryName'>{product.category}</p>
            <p className='brand'>{product.brand}<sub style={{fontSize:"10px"}}>TM</sub></p>
            <p className='infoName'>{product.name}</p>
            <p className='description'>{product.description}</p> 
          </div>
          <div className='priceSection'>
            <div className='rateSection'>
                <img style={{height: "20px"}} src='/images/star-images-9454.png'/>
                <p>{product.rating}</p>
            </div>
            <p className='numberOfReviews'>Number Of Reviews : ( {product.numReviews} )</p>
            <p className='numberOfReviews'>Count In Stock : {product.countInStock}</p>
            <p className='Price'>$ {product.price}</p>
          </div>
          
          <div className='addToCartButtonContainer'>
            <button
              className={ stockCheck ? 
                "addToCartButtonDisable" 
                :  
                "addToCartButton" }
              
              onClick={addToCart} >
              <p className='buttonText'>
              {stockCheck ? "Out Of Stock" : "Add To Cart"}
              </p>
              <img 
                style={{ display: stockCheck && "none" }}  
                id='cartIMG' src='/images/pngkey.com-cart-png-1169790.png'/>
              </button>
  
          </div>
          
  
      </div>
  
        
        )
      }
      
      

    </div>
  );
}
