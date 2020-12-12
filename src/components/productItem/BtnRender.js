import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { addCart } from "../../redux/actions/cartActions";

const BtnRender = ({ product, history, deleteProduct }) => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state);

  const handleProductId = () => {
    const path = isAdmin ? "edit_product" : "detail_product";
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
          <Link to="/" id="btn_buy" onClick={deleteProduct}>
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
