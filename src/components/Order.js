import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route, useParams } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';

export default function Order() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const params = useParams()

    const {id} = params

    const [singleOrder, setSingleOrder] = useState({});

    const [loading, setloading] = useState(true);

    const getsingleOrder= async() =>{
      try {
        const {data} = await axios.get(`http://5.161.141.215:5000/api/orders/${id}` , {headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }})
        setSingleOrder({...data})
        setloading(false)
      } catch (error) {
        console.log(error);
      }
    }




     useEffect(() => {
      getsingleOrder()
     }, []);


  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      {loading ? 
        <div className='loginPage'>
            <div className="loader"></div>
        </div>
        :
          (singleOrder.orderItems && 
            <>
              <div className='orderInfo'>
                <h2 className='finalOrderHeader'>
                  Order Info
                </h2>
                <div style={{display: "flex" , flexDirection: "column", alignItems: "center"}}>
                  {singleOrder.orderItems.map((item, index)=>{
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
                    <p className='orderCity'>City: {singleOrder.shippingAddress.city}</p>
                    <p className='orderCity'>Address: {singleOrder.shippingAddress.address}</p>
                    <p className='orderCity'>Postal Code: {singleOrder.shippingAddress.postalCode}</p>
                    <p className='orderCity'>Phone: {singleOrder.shippingAddress.phone}</p>
                    <p className='orderCity'>Payment Method: {singleOrder.paymentMethod}</p>
                    <p className='Price'>Total Price: {singleOrder.totalPrice} $</p>
                  </div>
                  <div className='orderButtons'>
                    <button 
                    className='orderInfoButton'
                    onClick={()=>{
                      dispatch({type: "address"})
                      navigate("/orders")
                    }}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </>
          )
        }
        
      
    </div>
  );
}
