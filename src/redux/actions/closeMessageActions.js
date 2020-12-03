export const closeMessage = (type) => (dispatch) => {
    dispatch({
        type,
        payload: null,
    });
};
