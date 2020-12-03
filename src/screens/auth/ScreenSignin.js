import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../../redux/actions/authActions";

import "./auth.scss";

const ScreenSignin = ({ history }) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin({ ...user }));
    };

    useEffect(() => {
        token && history.push("/");
    }, [history, token]);

    return (
        <>
            <div className="auth-page">
                <form onSubmit={submitHandler}>
                    <h2>Sign In</h2>
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
                        <button type="submit">Sign In</button>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ScreenSignin;
