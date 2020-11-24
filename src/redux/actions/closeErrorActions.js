export const closeError = (type) => (dispatch) => {
    dispatch({
        type,
        payload: null,
    });
};
