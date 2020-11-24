import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { closeError } from "../../redux/actions/closeErrorActions";
import "./messageBox.scss";

const MessageBox = ({ variant, message, type }) => {
    const dispatch = useDispatch();
    const onClickClose = () => {
        dispatch(closeError(type));
    };

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
