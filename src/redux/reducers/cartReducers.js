import { CART_ADD_ITEM } from "../constants/cartConstants";
import { AUTH_CART } from "../constants/authConstants";

export const cartReducer = (state = [], action) => {
    switch (action.type) {
        case AUTH_CART:
            return action.payload;
        case CART_ADD_ITEM:
            return action.payload;
        default:
            return state;
    }
};
