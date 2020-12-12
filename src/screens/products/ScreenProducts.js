import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  changeCheckedAllProducts,
  deleteProduct,
} from "../../redux/actions/productActions";
import ProductItem from "../../components/productItem/ProductItem";
import LoadingBox from "../../components/loading/LoadingBox";

import "./products.scss";
import { destroyImage } from "../../redux/actions/uploadActions";
import Filters from "./Filters";
import LoadMore from "./LoadMore";

const ScreenProducts = () => {
  const [callback, setCallback] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const initialFilters = useSelector((state) => state.filters);
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  const { isAdmin } = useSelector((state) => state);

  const handleCheckAll = () => {
    dispatch(changeCheckedAllProducts(isCheck));
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    if (
      window.confirm(
        "Esta seguro que desea eliminar todos los productos selecionados?"
      )
    ) {
      products.forEach((product) => {
        if (product.checked) {
          dispatch(deleteProduct(product._id));
          dispatch(destroyImage(product.images.public_id));
        }
      });
      setCallback(true);
    }
  };

  useEffect(() => {
    dispatch(listProducts(filters));
    if (callback) dispatch(listProducts(filters));
  }, [dispatch, callback, filters]);

  return (
    <>
      <Filters filters={filters} setFilters={setFilters} />
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={handleCheckAll} />
          <button onClick={handleDeleteAll}>Delete all</button>
        </div>
      )}
      {loading ? (
        <LoadingBox />
      ) : (
        products && (
          <div className="products">
            {products.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                callback={callback}
                setCallback={setCallback}
              />
            ))}
          </div>
        )
      )}
      {products && (
        <LoadMore
          filters={filters}
          setFilters={setFilters}
          result={products.length}
        />
      )}
    </>
  );
};

export default ScreenProducts;
