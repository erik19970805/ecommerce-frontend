import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    cartDecrementProduct,
    cartIncrementProduct,
    cartRemoveProduct,
    cartPayment,
} from "../../redux/actions/cartActions";
import PaypalButton from "./PaypalButton";

import "./cart.scss";

const ScreenCart = () => {
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const { cart } = useSelector((state) => state);

    const removeProduct = (id) => {
        if (window.confirm("Esta seguro que desea eliminar el producto?")) {
            dispatch(cartRemoveProduct(id));
        }
    };

    const decrementProduct = (id) => {
        cart.forEach((item, i) => {
            if (item._id === id) {
                if (item.quantity !== 1) dispatch(cartDecrementProduct(id));
            }
        });
    };

    const tranSuccess = async (payment) => {
        dispatch(cartPayment(payment));
    };

    useEffect(() => {
        const total = cart.reduce((prev, item) => {
            return prev + item.price * item.quantity;
        }, 0);
        setTotal(total);
    }, [dispatch, cart]);

    return (
        <>
            {cart.length === 0 ? (
                <h2 className="empty">Cart Empty</h2>
            ) : (
                cart.map((product, index) => {
                    return (
                        <div className="detail cart-items" key={index}>
                            <img
                                src={product.images.url}
                                alt={product.name}
                                className="img_container"
                            />
                            <div className="box-detail">
                                <div className="row">
                                    <h2>{product.name}</h2>
                                    <h6>#: {product._id}</h6>
                                </div>
                                <h3>$ {product.price * product.quantity}</h3>
                                <p>{product.description}</p>
                                <div className="amount">
                                    <button
                                        onClick={() =>
                                            decrementProduct(product._id)
                                        }
                                    >
                                        -
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                cartIncrementProduct(
                                                    product._id
                                                )
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <div
                                    className="delete"
                                    onClick={() => removeProduct(product._id)}
                                >
                                    X
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
            {cart.length > 0 && (
                <div className="total">
                    <h3>Total: $ {total}</h3>
                    <PaypalButton total={total} tranSuccess={tranSuccess} />
                </div>
            )}
        </>
    );
};

export default ScreenCart;
