import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../redux/actions/userActions";

const LoggedRouter = ({ userInfo }) => {
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };

    return (
        <>
            {userInfo ? (
                userInfo.isLogged && (
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
                )
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
