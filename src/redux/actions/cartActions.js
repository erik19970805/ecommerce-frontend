import { CART_ADD_ITEM } from "../constants/cartConstants";
import { apiCall } from "../api";
import { MESSAGE } from "../constants/messageContants";
import { closeExpireToken } from "./closeMessageActions";

const modifyCart = async (cart, token, dispatch) => {
  try {
    await apiCall(
      "PUT",
      "/cart/addcart",
      {
        cart,
      },
      { Authorization: `Bearer ${token}` }
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: [...cart],
    });
    localStorage.setItem("cart", JSON.stringify([...cart]));
  } catch (error) {
    dispatch(closeExpireToken(error));
  }
};

export const addCart = (product) => async (dispatch, getState) => {
  const { isLogged, cart, token } = getState();
  if (!isLogged)
    return dispatch({
      type: MESSAGE,
      payload: "Debe Iniciar Sesiòn",
    });
  try {
    const itemExist = cart.every((item) => {
      return item._id !== product._id;
    });
    if (itemExist) {
      modifyCart([...cart, { ...product, quantity: 1 }], token, dispatch);
    } else {
      dispatch({
        type: MESSAGE,
        payload: "El producto ya se añadio al carrito",
      });
    }
  } catch (error) {
    dispatch(closeExpireToken(error));
  }
};

export const cartIncrementProduct = (id) => (dispatch, getState) => {
  const { cart, token } = getState();
  cart.forEach((item) => {
    if (item._id === id) {
      item.quantity += 1;
    }
  });
  modifyCart(cart, token, dispatch);
};

export const cartDecrementProduct = (id) => (dispatch, getState) => {
  const { cart, token } = getState();
  cart.forEach((item, i) => {
    if (item._id === id) {
      item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
    }
  });
  modifyCart(cart, token, dispatch);
};

export const cartRemoveProduct = (id) => (dispatch, getState) => {
  const { cart, token } = getState();
  cart.forEach((item, index) => {
    if (item._id === id) {
      cart.splice(index, 1);
    }
  });
  modifyCart(cart, token, dispatch);
};

export const cartPayment = (payment) => async (dispatch, getState) => {
  const { cart, token } = getState();
  const { paymentID, address } = payment;
  try {
    const { data } = await apiCall(
      "POST",
      "/payment",
      { cart, paymentID, address },
      { Authorization: `Bearer ${token}` }
    );
    modifyCart([], token, dispatch);
    dispatch({
      type: MESSAGE,
      payload: data.message,
    });
  } catch (error) {
    dispatch(closeExpireToken(error));
  }
};
