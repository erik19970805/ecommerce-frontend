import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductItem from "../../components/productItem/ProductItem";
import LoadingBox from "../../components/loading/LoadingBox";

import "./products.scss";

const ScreenProducts = () => {
    const dispatch = useDispatch();
    const { loading, products } = useSelector((state) => state.productList);
    const { userInfo } = useSelector((state) => state.userSignin);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <LoadingBox />
            ) : (
                products && (
                    <div className="products">
                        {products.map((product) => (
                            <ProductItem
                                key={product._id}
                                product={product}
                                isAdmin={userInfo ? userInfo.isAdmin : null}
                            />
                        ))}
                    </div>
                )
            )}
        </>
    );
};

export default ScreenProducts;
