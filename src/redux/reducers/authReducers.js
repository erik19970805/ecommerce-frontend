import {
    AUTH_TOKEN,
    AUTH_ISLOGGED,
    AUTH_ISADMIN,
} from "../constants/authConstants";

export const tokenReducer = (state = null, action) => {
    switch (action.type) {
        case AUTH_TOKEN:
            return action.payload;
        default:
            return state;
    }
};

export const isLoggedReducer = (state = false, action) => {
    switch (action.type) {
        case AUTH_ISLOGGED:
            return action.payload;
        default:
            return state;
    }
};

export const isAdminReducer = (state = false, action) => {
    switch (action.type) {
        case AUTH_ISADMIN:
            return action.payload;
        default:
            return state;
    }
};
