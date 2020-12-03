import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../../redux/actions/categoryActions";
import LoadingBox from "../../components/loading/LoadingBox";

import "./categories.scss";

const ScreenCategories = () => {
    const [category, setCategory] = useState("");
    const [onUpdate, setOnUpdate] = useState(false);
    const [id, setId] = useState("");
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.categories);

    const submitHandler = (e) => {
        e.preventDefault();
        if (onUpdate) {
            dispatch(updateCategory({ id, name: category }));
        } else {
            dispatch(createCategory(category));
        }
        setOnUpdate(false);
        setCategory("");
    };

    const handleUpdateCategory = (id, name) => {
        setId(id);
        setCategory(name);
        setOnUpdate(true);
    };
    const handleDeleteCategory = (id) => {
        if (window.confirm("Esta seguro que desea eliminar el producto?")) {
            dispatch(deleteCategory(id));
        }
    };

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="categories">
            <form onSubmit={submitHandler}>
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    name="category"
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button type="submit">{onUpdate ? "Update" : "Save"}</button>
            </form>
            {loading ? (
                <LoadingBox />
            ) : (
                <div className="col">
                    {categories.map((category) => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button
                                    onClick={() =>
                                        handleUpdateCategory(
                                            category._id,
                                            category.name
                                        )
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteCategory(category._id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ScreenCategories;
