import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';
import { AddSameProduct } from '../action';
import { remove } from '../action';

export default function Cart() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState([]);

    const myCart = useSelector(state=> state.cart)


    const {user} = useSelector(state => state.user)
    const {errorUserFlag} = useSelector(state => state.user)



    localStorage.setItem('cart',JSON.stringify(myCart)) 

    function getTotal() {
        myCart.map((item)=>{
            return (setTotal((last) => last + item.qtyPrice))
        })
    }
    function createOrder() {
        myCart.map((item)=>{
            const help = {
                product: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
                countInStock: item.countInStock,
                qty: item.qty 
            }
            setOrder((last)=>{
                return [...last, help]
            })
        })
        
    }


    useEffect(() => {
        getTotal()
        createOrder()
        dispatch({type: "cart"})
      return () => {
        setTotal(0)
        setOrder([])
      };
    }, [myCart]);


  return (
    <div className='cart'>
        {myCart.length ? 
        <>
            {myCart.map((item,index)=>{
            return (
                <div key={index} className='cartItems'>
                    <img className='cartImg'  src={item.image}/>
                    <div className='cartNamePrice'>
                        <p className='cartName'>{item.name}</p>
                        <p className='Price'>$ {item.price}</p>
                    </div>
                    <div className='Quantity'>
                        <img 
                        onClick={()=>remove(dispatch,item._id)} 
                        className='cartIncDecBtn' 
                        src='/images/minus-sign-on-transparent-background-PNG.png'/>
                        <h4 className='cartQuantity' >{item.qty}</h4>
                        <img
                        style={{display: item.qty === item.countInStock && "none"}}
                        onClick={()=>AddSameProduct(dispatch,item._id)} 
                        className='cartIncDecBtn' 
                        src='/images/plus-sign-and-minus-sign-on-transparent-background-PNG.png'/>
                    </div>
                </div>
            )
        })}
        <div className='NextTotal'>
            <h1 className="totalP" >Total:  {total} $</h1>
            <button 
            style={{fontSize: "35px",padding: "25px"}} 
            className='addToCartButton'
            onClick={()=>{
                if(!errorUserFlag && !user.id){
                    navigate("/login")
                }else{
                    dispatch({type:"addCartToOrder", payload: order, total: total}) 
                    dispatch({type:"address"}) 
                    navigate("/address")             
                }
            }}
            >
                Next
            </button>
        </div>
        </>
        :
        <h1 className='cartEmpty'>
            Cart Is Empty!
        </h1>
        
    }
        
    
      
    </div>
  );
}
