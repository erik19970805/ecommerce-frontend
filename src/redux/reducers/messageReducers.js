import { ERROR, MESSAGE } from "../constants/messageContants";

export const messagesReducer = (state = null, action) => {
    switch (action.type) {
        case MESSAGE:
            return action.payload;
        default:
            return state;
    }
};
export const errorsReducer = (state = null, action) => {
    switch (action.type) {
        case ERROR:
            return action.payload;
        default:
            return state;
    }
};
