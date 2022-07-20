import React from 'react';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { getMyOrders } from '../action';

export default function Orders() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [loading, setloading] = useState(true);


    const {orders} = useSelector(state => state.myOrders)
    const {error} = useSelector(state => state.myOrders)
    const {errorMessage} = useSelector(state => state.myOrders)


     useEffect(() => {
        getMyOrders(dispatch,JSON.parse(localStorage.getItem('token')))
       return () => {
        setloading(false)
       };
     }, [orders]);


  return (
    <div style={{display: "flex" , flexDirection: "column", alignItems: "center"}}>
        {loading ? 
        <div className='loginPage'>
            <div className="loader"></div>
        </div>
        :
            (error ? 
                <div className='NotFound'>
                    <h1 className='pageEmpty'>
                        Somthing Went Wrong!
                    </h1>
                    <h1 className='pageEmpty'>
                        {errorMessage}
                    </h1>
                </div>
            : 
            (orders.length === 0 && !loading) ? 
                    <div className='NotFound'>
                        <h1 className='pageEmpty'>
                            You Have Not
                        </h1>
                        <h1 className='pageEmpty'>
                            Order AnyThing!
                        </h1>
                    </div>
                :
                    <>
                        <h2 className='ordersHeader'>
                            List Of your Orders:
                        </h2>

                        <div className='ordersList'>
                            {orders.map((item, index)=>{
                                return (
                                    <div key={index} className='orderContainer'
                                    onClick={()=>navigate(`/orders/${item._id}`, {state:item._id})}
                                    >
                                        <div style={{height: "170px", display: "flex" , justifyContent: "center"}}>
                                            <img className='orderImg' src='/images/kindpng_1953240.png'/>
                                        </div>
                                        <div style={{height: "130px"}}>
                                            <p style={{color: "#2d74ff"}} className='orderInfos'>Date:</p>
                                            <p style={{fontSize: "14px"}} className='orderInfos'>{item.createdAt}</p>
                                            <p style={{color: "#db0054"}} className='orderInfos'>Total Price:</p>
                                            <p style={{fontSize: "14px"}} className='orderInfos'>{item.totalPrice}</p>
                                        </div>  
                                    </div>
                                )
                            })}

                        </div>
                    </>
                
            )
        }
        
        
        
      
    </div>
  );
}
