import axios from "axios"


export const getProducts = async(dispatch) => {
    try {
        const {data} = await axios.get("http://5.161.141.215:5000/api/products")
        dispatch({type: "success", payload: [...data]})
    } catch (error) {
        dispatch({type: "failed", payload: error.message})
    }
}
export const getProduct = async(dispatch,id) => {
    try {
        const {data} = await axios.get(`http://5.161.141.215:5000/api/products/${id}`)
        dispatch({type: "successProduct", payload: data})
    } catch (error) {
        dispatch({type: "failedProduct", payload: "Coudnt Find Any Product!"})
    }
}
export const getUserInfo = async(dispatch,token) => {
    try {
        const {data} = await axios.get("http://5.161.141.215:5000/api/users/profile" , {headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }})
        dispatch({type: "successUserInfo", payload: data})
    } catch (error) {

        dispatch({type: "failedUserInfo", payload: error.response.data.message})
    }
}
export const getMyOrders = async(dispatch,token) => {
    try {   
        const {data} = await axios.get("http://5.161.141.215:5000/api/orders/myorders" , {headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }})

        dispatch({type: "allOrders", payload: data})
    } catch (error) {
        dispatch({type: "error", payload: error.response.data.message})
    }
}
export const singleOrder = async(dispatch,id) => {
    try {   
        const {data} = await axios.get(`http://5.161.141.215:5000/api/orders/${id}` , {headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          }})

        dispatch({type: "successSingleOrder", payload: data})
    } catch (error) {
        dispatch({type: "failedSingleOrder", payload: error.response.data.message})
    }
}

export const successAddProduct = async(dispatch,product) => {
    if(product.countInStock !== 0){
        dispatch({type:"successAddProduct",payload: product})
    }
}
export const AddSameProduct = async(dispatch,id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    {cart.map((item)=>{
                
        if(item.countInStock !== item.qty){
            if(item._id === id) {
                item.qty = item.qty + 1
                item.qtyPrice = item.qty * item.price
                return {...item}
            }
            else {
                return {...item}
            }
        }
    })}
    dispatch({type: "AddSameProduct", payload: cart})
}

export const remove = async(dispatch,id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    {cart.map((item)=>{
        if(item._id === id) {
            item.qty -= 1
            item.qtyPrice = item.qty * item.price
            return {...item}
        }
        else {
            return {...item}
        }

    })}
    const help = cart.filter((item)=>{
        return item.qty !== 0
    })
    dispatch({type: "remove", payload: help})
}