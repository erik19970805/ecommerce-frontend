import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../../redux/actions/userActions";
import MessageBox from "../../components/messageBox/MessageBox";

import "./users.scss";

const ScreenSignin = ({ history }) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const { userInfo, error } = useSelector((state) => state.userSignin);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin({ ...user }));
    };

    useEffect(() => {
        userInfo && userInfo.token && history.push("/");
    }, [history, userInfo]);

    return (
        <>
            {error && (
                <MessageBox
                    variant="danger"
                    message={error}
                    type={"USER_SIGNIN_FAIL"}
                />
            )}
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
