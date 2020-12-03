import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../redux/actions/authActions";

const LoggedRouter = () => {
    const dispatch = useDispatch();
    const { isLogged } = useSelector((state) => state);
    const signoutHandler = () => {
        dispatch(signout());
    };

    return (
        <>
            {isLogged ? (
                <>
                    <li>
                        <Link to="/history">History</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={signoutHandler}>
                            Sign Out
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </>
            )}
        </>
    );
};

export default LoggedRouter;
