import { apiCall } from "../api";
import { ERROR } from "../constants/messageContants";
import {
    DESTROY_REQUEST,
    DESTROY_SUCCESS,
    UPLOAD_REQUEST,
    UPLOAD_SUCCESS,
} from "../constants/uploadContants";

export const uploadImage = (file) => async (dispatch, getState) => {
    dispatch({ type: UPLOAD_REQUEST });
    try {
        const { token } = getState();
        let formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "products");
        const { data } = await apiCall("POST", "/upload", formData, {
            Authorization: ` Bearer ${token}`,
        });
        dispatch({ type: UPLOAD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};

export const detroyImage = (public_id) => async (dispatch, getState) => {
    dispatch({ type: DESTROY_REQUEST });
    try {
        const { token } = getState();
        await apiCall("POST", "/upload/destroy", public_id, {
            Authorization: ` Bearer ${token}`,
        });
        dispatch({ type: DESTROY_SUCCESS, payload: null });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};
