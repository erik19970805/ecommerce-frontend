import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import AdminRouter from "../../components/AdminRouter";
import LoggedRouter from "../../components/LoggedRouter";
import "./header.scss";

const ScreenHeader = () => {
    const { isAdmin } = useSelector((state) => state);
    const { cart } = useSelector((state) => state);
    return (
        <header>
            <div className="menu">
                <FaBars />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? "Admin" : "Mi Shop"}</Link>
                </h1>
            </div>
            <ul>
                <li>
                    <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
                </li>
                {isAdmin && <AdminRouter />}

                <LoggedRouter />
                <li>
                    <FaTimes className="menu" />
                </li>
            </ul>
            {isAdmin ? null : (
                <div className="cart">
                    <Link to="/cart">
                        <span>{cart.length}</span>
                        <FaShoppingCart className="cart-icon" />
                    </Link>
                </div>
            )}
        </header>
    );
};

export default ScreenHeader;
