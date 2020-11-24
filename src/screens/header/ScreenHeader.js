import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import AdminRouter from "../../components/AdminRouter";
import LoggedRouter from "../../components/LoggedRouter";
import "./header.scss";

const ScreenHeader = () => {
    const { userInfo } = useSelector((state) => state.userSignin);
    return (
        <header>
            <div className="menu">
                <FaBars />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">
                        {userInfo && userInfo.isAdmin ? "Admin" : "Mi Shop"}
                    </Link>
                </h1>
            </div>

            <ul>
                <li>
                    <Link to="/">Products</Link>
                </li>
                {userInfo && userInfo.isAdmin && <AdminRouter />}

                <LoggedRouter userInfo={userInfo} />
                <li>
                    <FaTimes className="menu" />
                </li>
            </ul>
            {userInfo && !userInfo.isAdmin && (
                <div className="cart">
                    <span>0</span>
                    <Link to="/cart">
                        <FaShoppingCart className="cart-icon" />
                    </Link>
                </div>
            )}
        </header>
    );
};

export default ScreenHeader;
