import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroyImage } from "../../redux/actions/uploadActions";
import BtnRender from "./BtnRender";
import {
  deleteProduct,
  changeCheckedProducts,
} from "../../redux/actions/productActions";
import "./productItem.scss";

const ProductItem = ({ product, callback, setCallback }) => {
  const dispatch = useDispatch();
  const { _id, images, name, price, description, checked } = product;
  const { isAdmin } = useSelector((state) => state);

  const deleteOneProduct = () => {
    if (
      window.confirm("Esta seguro que desea eliminar el producto selecionado?")
    ) {
      dispatch(destroyImage(images.public_id));
      dispatch(deleteProduct(_id));
      setCallback(!callback);
    }
  };

  const handleCheck = () => {
    dispatch(changeCheckedProducts(_id, checked));
  };

  return (
    <div className="product_card">
      {isAdmin && (
        <input type="checkbox" checked={checked} onChange={handleCheck} />
      )}
      <img src={images.url} alt={name} />
      <div className="product_box">
        <h2 title={name}>{name}</h2>
        <span>${price}</span>
        <p>{description}</p>
      </div>
      <BtnRender product={product} deleteProduct={deleteOneProduct} />
    </div>
  );
};

export default ProductItem;
