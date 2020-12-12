import React from "react";
import { Link } from "react-router-dom";

const AdminRouter = () => {
  return (
    <>
      <li>
        <Link to="/products/create_product">Create Product</Link>
      </li>
      <li>
        <Link to="/category">Categories</Link>
      </li>
    </>
  );
};
export default AdminRouter;
