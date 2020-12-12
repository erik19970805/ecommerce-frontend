import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { uploadImage, destroyImage } from "../../redux/actions/uploadActions";
import {
  createProduct,
  detailsProduct,
  updateProduct,
} from "../../redux/actions/productActions";
import { withRouter } from "react-router-dom";
import "./createProduct.scss";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/productConstants";
import { IMAGES_RESET } from "../../redux/constants/uploadContants";

const initialState = {
  name: "",
  description: "",
  quantity: 0,
  price: 0,
  stock: 0,
  images: {},
  category: "",
};

const ScreenCreateProduct = ({ history, match }) => {
  const [product, setProduct] = useState(initialState);
  const [callback, setCallback] = useState(true);
  const productId = match.params.id;
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { successUpdate } = useSelector((state) => state.productUpdate);
  const { product: productDetail } = useSelector((state) => state.product);
  const { images } = useSelector((state) => state.images);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    dispatch(uploadImage(file));
  };

  const handleDestroy = () => {
    if (productId) {
      dispatch(destroyImage(product.images.public_id));
      setProduct({ ...product, images: {} });
    } else {
      dispatch(destroyImage(images.public_id));
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId) {
      dispatch(updateProduct({ ...product, images }, productId));
    } else {
      dispatch(createProduct({ ...product, images }));
    }
    dispatch({ type: IMAGES_RESET });
    history.push("/");
  };

  const styleUpload = {
    display: images || product.images.url ? "block" : "none",
  };

  useEffect(() => {
    if (productId) {
      if (productDetail) {
        if (productDetail._id !== productId || successUpdate) {
          setCallback(true);
        }
      }
      if (callback) {
        dispatch(getCategories());
        dispatch(detailsProduct(productId));
        dispatch({ type: PRODUCT_UPDATE_RESET });
        setCallback(false);
      }
      if (productDetail) setProduct(productDetail);
    } else {
      if (callback) {
        dispatch(getCategories());
        setCallback(false);
      }
      setProduct(initialState);
    }
  }, [callback, dispatch, productDetail, productId, successUpdate]);

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        <div id="file_img" style={styleUpload}>
          <img src={images ? images.url : product.images.url} alt="images" />
          <span onClick={handleDestroy}>X</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={product.name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Descripciòn</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={product.description}
            required
            rows="5"
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="row">
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            value={product.quantity}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            required
            value={product.stock}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="categories">Categoria</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Porfavor seleccione una categoria</option>
            {categories &&
              categories.map((category) => {
                return (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>
        <button type="submit">{productId ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default withRouter(ScreenCreateProduct);
