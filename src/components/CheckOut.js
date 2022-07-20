import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';

export default function CheckOut() {
    const order = useSelector(state=> state.order)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [orderstats, setOrderstats] = useState({
      success: false,
      failed: false,
      loading: false,
    });


    const sendOrder = async() => {
      window.scrollTo(500, 0);
      setOrderstats((last)=> ({...last,loading:true}))
      try {
        const {data} = await axios.post("http://5.161.141.215:5000/api/orders" , order,
        {headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }}
        )
        dispatch({type: "emptyCart"})
        dispatch({type: "doneOrder"})
        localStorage.removeItem('cart')
        setOrderstats((last)=> ({...last,success:true,failed:false,loading:false}))
        
      } catch (error) {
        console.log(error.response.data.message);
        setOrderstats((last)=> ({...last,success:false,failed:true,loading:false}))
      }
    }
    

 
    

    
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      { orderstats.loading ? <div className='loadingOrder'><div className="loader"></div></div>
      : orderstats.success ? 
      <div className='successOrder'>
        <img className='successOrderImg'  src='/images/Daco_1979649.png'/>
        <p className='successOrderNote'>Thanks For Your Purchase!</p>
      </div> 
      : orderstats.failed ? 
        <div className='failedOrder'>
          <p id='failedOrder'>Oops!</p>
          <p id='failedOrder'>Somthing Went Wrong Please Try Again Later</p>
        </div>
      :
        <div className='orderInfo'>
          <h2 className='finalOrderHeader'>
            Final Order Info
          </h2>
          <div style={{display: "flex" , flexDirection: "column", alignItems: "center"}}>
            {order.orderItems.map((item, index)=>{
              return (
                <div key={index} className='finalOrderitems'>
                  <img className='finalOrderImg' src={item.image}/>
                  <div className='priceAndQty'>
                    <p className='orderName'>{item.name}</p>
                    <p className='Price'>{item.price} $</p>
                    <p className='orderQty'>Quantity: {item.qty}</p>
                  </div>               
                </div>
              )
            })}
            <div className='orderInformations'>
              <p className='orderCity'>City: {order.shippingAddress.city}</p>
              <p className='orderCity'>Address: {order.shippingAddress.address}</p>
              <p className='orderCity'>Postal Code: {order.shippingAddress.postalCode}</p>
              <p className='orderCity'>Phone: {order.shippingAddress.phone}</p>
              <p className='orderCity'>Payment Method: {order.paymentMethod}</p>
              <p className='Price'>Total Price: {order.totalPrice} $</p>
            </div>
            <div className='orderButtons'>
              <button 
              className='orderInfoButton'
              onClick={()=>{
                dispatch({type: "address"})
                navigate("/address")
              }}
              >
                Edit
              </button>

              <button 
              className='orderInfoButton'
              onClick={sendOrder}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      }
      
    </div>
  );
}
