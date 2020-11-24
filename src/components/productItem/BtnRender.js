import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const BtnRender = ({ product, history }) => {
    const { userInfo } = useSelector((state) => state.userSignin);

    const handleProductId = (path) => history.push(`/${path}/${product._id}`);
    const handleAddCart = () => <h1>nuevo</h1>;

    return (
        <div className="row_btn">
            {userInfo ? (
                userInfo.isAdmin && (
                    <>
                        <Link to="/cart" id="btn_buy">
                            Delete
                        </Link>
                        <button
                            id="btn_view"
                            onClick={() => handleProductId("edit_product")}
                        >
                            Edit
                        </button>
                    </>
                )
            ) : (
                <>
                    <Link to="/cart" id="btn_buy" onClick={handleAddCart}>
                        Buy
                    </Link>
                    <button
                        id="btn_view"
                        onClick={() => handleProductId("detail")}
                    >
                        View
                    </button>
                </>
            )}
        </div>
    );
};

export default withRouter(BtnRender);
