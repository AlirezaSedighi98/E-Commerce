//gets all products
export const dataReducer = (state={listOfProducts:[],error: "",errorFlag: false},action) => {
    switch (action.type) {
        case "success":
            return {...state, listOfProducts: action.payload,errorFlag: false}
        case "failed":
            return {...state, error: action.payload, errorFlag: true}
        default:
            return state
    }       
}


//gets information about a product
export const productReducer = (state={product:[],productError: "",productErrorFlag: false},action) => {
    switch (action.type) {
        case "successProduct":
            action.payload.qty = 1
            action.payload.qtyPrice = action.payload.price
            return {product: action.payload, productErrorFlag: false}
        case "failedProduct":
            return {...state, productError: action.payload, productErrorFlag: true}
        default:
            return state
    }       
}



//adds product to cart
export const addToCartReducer = (state=
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):
    []
,action) => {
    switch (action.type) {
        case "emptyCart":

            return []

        case "successAddProduct":  

            return [...state, action.payload]
   
        case "AddSameProduct":

            return action.payload

        case "remove":
            
            return action.payload

        default:
            return state
    }       
}



//loggin or log out
export const userReducer = (state={user:[],userError: "",errorUserFlag: false},action) => {
    switch (action.type) {
        case "successUserInfo":
            return {...state, user: action.payload,errorFlag: false}
        case "logedOut":
            return {...state, user: [] , error: "",errorFlag: false}
        case "failedUserInfo":
            localStorage.removeItem('token')
            return {...state, error: "token is not valid", errorFlag: true}
        default:
            return state
    }       
}




//produces the final order to send
export const orderReducer = (state={
    orderItems:[],
    shippingAddress: {},
    paymentMethod: "6037...",
    itemsPrice: 0,
    shippingPrice: 0.00,
    totalPrice: 0},action) => {
    switch (action.type) {
        case "addCartToOrder":
            
            return{...state, 
                orderItems: action.payload,
                itemsPrice: action.total,
                totalPrice: action.total
            }

        case "addAddressToOrder":
            const help = {
                address: action.payload.address,
                city: action.payload.city,
                postalCode: action.payload.postalCode,
                phone: action.payload.phone
            }

            return {...state, shippingAddress: help}
        default:
            return state
    }       
}



//which page should or should not show up
export const redLightReducer = (state={address: false, checkOut: false},action) => {
    switch (action.type) {
        case "address":
            return {...state, address: true , checkOut: false}
        case "cart":
            return {...state, address: false , checkOut: false}
        case "checkOut":
            return {...state, address: true , checkOut: true}
        case "doneOrder":
            return {...state, address: false , checkOut: true}
        default:
            return state
    }       
}



//every order that user has ever done
export const getMyOrderReducer = (state={orders:[],error:false, errorMessage:""},action) => {
    switch (action.type) {
        case "allOrders":

            return {...state, orders: action.payload, error:false}
        case "error":

            return {...state, orders: [], error:true, errorMessage: action.payload}

        default:
            return state
    }
}



//information about a single past order
export const singleOrderReducer = (state={order:[],error: false, errorMessage: ""},action) => {
    switch (action.type) {
        case "successSingleOrder":
            return {...state, order: action.payload,error: false}
        case "failedSingleOrder":
            return {...state, errorMessage: action.payload, error: true}
        default:
            return state
    }       
}