import { apiCall } from "../api";
import { ERROR } from "../constants/messageContants";
import {
  IMAGES_DESTROY_REQUEST,
  IMAGES_DESTROY_SUCCESS,
  IMAGES_UPLOAD_REQUEST,
  IMAGES_UPLOAD_SUCCESS,
} from "../constants/uploadContants";

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
    dispatch({
      type: ERROR,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
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
    dispatch({
      type: ERROR,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
