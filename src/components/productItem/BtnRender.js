import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { addCart } from "../../redux/actions/cartActions";

const BtnRender = ({ product, history }) => {
    const dispatch = useDispatch();
    const { isAdmin } = useSelector((state) => state);

    const handleProductId = () => {
        const path = isAdmin ? "edit" : "detail";
        history.push(`/products/${path}/${product._id}`);
    };
    const handleAddCart = () => {
        dispatch(addCart(product));
        history.push(history.location.pathname);
    };

    return (
        <div className="row_btn">
            {isAdmin ? (
                <>
                    <Link to="/cart" id="btn_buy">
                        Delete
                    </Link>
                    <button id="btn_view" onClick={handleProductId}>
                        Edit
                    </button>
                </>
            ) : (
                <>
                    <button id="btn_buy" onClick={handleAddCart}>
                        Buy
                    </button>
                    <button id="btn_view" onClick={handleProductId}>
                        View
                    </button>
                </>
            )}
        </div>
    );
};

export default withRouter(BtnRender);
