import {
    DESTROY_REQUEST,
    DESTROY_SUCCESS,
    UPLOAD_REQUEST,
    UPLOAD_SUCCESS,
} from "../constants/uploadContants";

export const uploadReducer = (state = { loadingUpload: true }, action) => {
    switch (action.type) {
        case UPLOAD_REQUEST:
            return { loadingUpload: true };
        case UPLOAD_SUCCESS:
            return { loadingUpload: false, images: action.payload };
        case DESTROY_REQUEST:
            return { loadingUpload: true };
        case DESTROY_SUCCESS:
            return { loadingUpload: false, images: action.payload };
        default:
            return state;
    }
};
