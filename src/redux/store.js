import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
    productListReducer,
    productDetailsReducer,
} from "./reducers/productReducers";
import { messagesReducer, errorsReducer } from "./reducers/messageReducers";
import {
    isAdminReducer,
    isLoggedReducer,
    tokenReducer,
} from "./reducers/authReducers";
import {
    categoriesReducer,
    categoryReducer,
} from "./reducers/categoryReducers";
import { cartReducer } from "./reducers/cartReducers";
import { historiesReducer, historyReducer } from "./reducers/historyReducers";
import { uploadReducer } from "./reducers/uploadReducers";

const auth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const initialState = {
    token: auth ? auth.token : null,
    isLogged: auth ? auth.isLogged : false,
    isAdmin: auth ? auth.isAdmin : false,
    cart,
};

const reducer = combineReducers({
    products: productListReducer,
    product: productDetailsReducer,
    token: tokenReducer,
    isLogged: isLoggedReducer,
    isAdmin: isAdminReducer,
    cart: cartReducer,
    histories: historiesReducer,
    history: historyReducer,
    category: categoryReducer,
    categories: categoriesReducer,
    images: uploadReducer,
    error: errorsReducer,
    message: messagesReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
