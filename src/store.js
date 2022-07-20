import { legacy_createStore as createStore,applyMiddleware,combineReducers } from "redux";
import thunk from "redux-thunk";
import {dataReducer} from './reducer';
import { productReducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { addToCartReducer } from "./reducer";
import { userReducer } from "./reducer";
import { orderReducer } from "./reducer";
import { redLightReducer } from "./reducer";
import { getMyOrderReducer } from "./reducer";
import { singleOrderReducer } from "./reducer";

const myReducers = combineReducers({
   Products : dataReducer,
   Product : productReducer,
   cart : addToCartReducer,
   user: userReducer,
   order: orderReducer,
   redLight: redLightReducer,
   myOrders: getMyOrderReducer,
   getSingleOrder: singleOrderReducer
})

const middleware = [thunk]
const store = createStore(myReducers, composeWithDevTools(applyMiddleware(...middleware)))


export default store;