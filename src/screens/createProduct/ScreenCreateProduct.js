import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import LoadingBox from "../../components/loading/LoadingBox";

import "./createProduct.scss";
import { uploadImage } from "../../redux/actions/uploadActions";

const ScreenCreateProduct = () => {
    const [product, setProduct] = useState({
        id: "",
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        stock: 0,
        category: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.categories);
    const { images } = useSelector((state) => state.images);
    console.log(images);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setIsLoading(true);
        dispatch(uploadImage(file));
    };

    const styleUpload = {
        display: images ? "block" : "none",
    };

    return (
        <>
            {loading ? (
                <LoadingBox />
            ) : (
                <div className="create_product">
                    <div className="upload">
                        <input
                            type="file"
                            name="file"
                            id="file_up"
                            onChange={handleUpload}
                        />
                        <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ""} alt="images" />
                            <span>X</span>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={product.name}
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
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="categories">Categoria</label>
                            <select name="category" value={product.category}>
                                <option value="">
                                    Porfavor seleccione una categoria
                                </option>
                                {categories.map((category) => {
                                    return (
                                        <option
                                            value={category._id}
                                            key={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ScreenCreateProduct;
