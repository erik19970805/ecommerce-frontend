import React from "react";
import { useSelector } from "react-redux";
import BtnRender from "./BtnRender";
import "./productItem.scss";

const ProductItem = ({ product }) => {
    const { images, name, price, description, checked } = product;
    const { isAdmin } = useSelector((state) => state);
    return (
        <div className="product_card">
            {isAdmin && <input type="checkbox" defaultChecked={checked} />}
            <img src={images.url} alt={name} />
            <div className="product_box">
                <h2 title={name}>{name}</h2>
                <span>${price}</span>
                <p>{description}</p>
            </div>
            <BtnRender product={product} />
        </div>
    );
};

export default ProductItem;
