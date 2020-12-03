import React, { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { closeMessage } from "../../redux/actions/closeMessageActions";

import "./messageBox.scss";

const MessageBox = ({ variant, message, type }) => {
    const dispatch = useDispatch();
    const onClickClose = () => {
        dispatch(closeMessage(type));
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch(closeMessage(type));
        }, 5000);
    }, [dispatch, type]);

    return (
        <div className="alert">
            <div className={`alert-${variant || "info"}`}>
                {message}
                <AiFillCloseCircle className="close" onClick={onClickClose} />
            </div>
        </div>
    );
};

export default MessageBox;
