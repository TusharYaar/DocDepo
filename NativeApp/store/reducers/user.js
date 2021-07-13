import {LOGIN, LOGOUT, NO_USER} from "../actions/user";
const initialState = {
    accessToken: null,
    expirationTime: null,
    email: null,
    apiKey: null,
    autoLogin: true,
    uid: null,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case LOGIN:
        return {...payload, autoLogin: false }
    case LOGOUT:
        return {...initialState, autoLogin: false};
    case NO_USER: {
        return {...initialState, autoLogin: false};
    }
    default:
        return state
    }
}
