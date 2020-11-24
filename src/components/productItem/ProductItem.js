import React from "react";
import BtnRender from "./BtnRender";
import "./productItem.scss";

const ProductItem = ({ product, isAdmin }) => {
    const { images, name, price, description, checked } = product;

    return (
        <div className="product_card">
            {isAdmin ? <input type="checkbox" checked={checked} /> : null}
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
