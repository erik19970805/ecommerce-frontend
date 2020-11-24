import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../../components/messageBox/MessageBox";
import { signup } from "../../redux/actions/userActions";

import "./users.scss";

const ScreenSignup = ({ history }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const { message, error } = useSelector((state) => state.userSignup);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const signupSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({ ...user }));
    };

    return (
        <>
            {message ? (
                <MessageBox
                    variant="success"
                    message={message}
                    type={"USER_SIGNUP_SUCCESS"}
                />
            ) : (
                error && (
                    <MessageBox
                        variant="danger"
                        message={error}
                        type={"USER_SIGNUP_FAIL"}
                    />
                )
            )}
            <div className="auth-page">
                <form onSubmit={signupSubmit}>
                    <h2>Sign Up</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={onChangeInput}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={onChangeInput}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={onChangeInput}
                        required
                    />
                    <div className="row">
                        <button type="submit">Sign Up</button>
                        <Link to="/signin">Sign In</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ScreenSignup;
