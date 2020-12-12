import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import ProductItem from "../../components/productItem/ProductItem";
import {
  detailsProduct,
  listProducts,
} from "../../redux/actions/productActions";
import LoadingBox from "../../components/loading/LoadingBox";
import { addCart } from "../../redux/actions/cartActions";
import "./productDetails.scss";

const ScreenProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const { filters } = useSelector((state) => state);
  const { products } = useSelector((state) => state.products);
  const { product } = useSelector((state) => state.product);

  const handleAddCart = () => {
    dispatch(addCart(product));
    history.push(history.location.pathname);
  };

  useEffect(() => {
    dispatch(detailsProduct(productId));
    dispatch(listProducts(filters));
  }, [dispatch, productId, filters]);
  if (!product || !products) return <LoadingBox />;
  return (
    <>
      <div className="detail">
        <img src={product.images.url} alt={product.name} />
        <div className="box-detail">
          <div className="row">
            <h2>{product.name}</h2>
          </div>
          <span>$ {product.price}</span>
          <p>{product.description}</p>
          <p>Sold: {product.sold}</p>
          <button className="cart" onClick={handleAddCart}>
            Buy now
          </button>
        </div>
      </div>

      <div>
        <h2>Related products</h2>
        <div className="products">
          {products.map((product) => {
            return <ProductItem key={product._id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default withRouter(ScreenProductDetails);
