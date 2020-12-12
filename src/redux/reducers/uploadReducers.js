import {
  IMAGES_RESET,
  IMAGES_DESTROY_REQUEST,
  IMAGES_DESTROY_SUCCESS,
  IMAGES_UPLOAD_REQUEST,
  IMAGES_UPLOAD_SUCCESS,
} from "../constants/uploadContants";

export const uploadReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGES_UPLOAD_REQUEST:
      return { loadingUpload: true };
    case IMAGES_UPLOAD_SUCCESS:
      return { loadingUpload: false, images: action.payload };
    case IMAGES_DESTROY_REQUEST:
      return { loadingUpload: true };
    case IMAGES_DESTROY_SUCCESS:
      return { loadingUpload: false, images: action.payload };
    case IMAGES_RESET:
      return {};
    default:
      return state;
  }
};
