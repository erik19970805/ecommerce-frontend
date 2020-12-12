import { apiCall } from "../api";
import {
  IMAGES_DESTROY_REQUEST,
  IMAGES_DESTROY_SUCCESS,
  IMAGES_UPLOAD_REQUEST,
  IMAGES_UPLOAD_SUCCESS,
} from "../constants/uploadContants";
import { closeExpireToken } from "./closeMessageActions";

export const uploadImage = (file) => async (dispatch, getState) => {
  dispatch({ type: IMAGES_UPLOAD_REQUEST });
  try {
    const { token } = getState();
    let formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "products");
    const { data } = await apiCall("POST", "/upload", formData, {
      Authorization: ` Bearer ${token}`,
    });
    dispatch({ type: IMAGES_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch(closeExpireToken(error));
  }
};

export const destroyImage = (public_id) => async (dispatch, getState) => {
  dispatch({ type: IMAGES_DESTROY_REQUEST });
  try {
    const { token } = getState();
    await apiCall(
      "POST",
      "/upload/destroy",
      { public_id },
      {
        Authorization: ` Bearer ${token}`,
      }
    );
    dispatch({ type: IMAGES_DESTROY_SUCCESS, payload: null });
  } catch (error) {
    dispatch(closeExpireToken(error));
  }
};
