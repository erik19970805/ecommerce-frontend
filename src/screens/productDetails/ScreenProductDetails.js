import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    detailsProduct,
    listProducts,
} from "../../redux/actions/productActions";
import "./productDetails.scss";

const ScreenProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const productId = match.params.id;
    const { products } = useSelector((state) => state.productList);
    const { productDetails } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(listProducts());
        dispatch(detailsProduct({ productId }));
    }, [dispatch, productId]);
    if (!products || !productDetails) return <Loading />;

    return (
        <>
            <div className="detail">
                <img
                    src={productDetails.images.url}
                    alt={productDetails.name}
                />
                <div className="box-detail">
                    <div className="row">
                        <h2>{productDetails.name}</h2>
                        <h6>#: {productDetails._id}</h6>
                    </div>
                    <span>$ {productDetails.price}</span>
                    <p>{productDetails.description}</p>
                    <Link to="/cart" className="cart">
                        Buy now
                    </Link>
                </div>
            </div>

            <div>
                <h2 className="related">Related products</h2>
                <div className="products">
                    {products.map((product) => {
                        return (
                            <ProductItem key={product._id} product={product} />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ScreenProductDetails;
