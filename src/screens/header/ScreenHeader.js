import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import AdminRouter from "../../components/AdminRouter";
import LoggedRouter from "../../components/LoggedRouter";
import "./header.scss";

const ScreenHeader = () => {
  const [menu, setMenu] = useState(false);
  const { isAdmin } = useSelector((state) => state);
  const { cart } = useSelector((state) => state);

  const toggleMenu = () => setMenu(!menu);

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };
  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <FaBars />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Mi Shop"}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && <AdminRouter />}

        <LoggedRouter />
        <li onClick={() => setMenu(!menu)}>
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
