import {LOGIN, LOGOUT} from "../actions/user";
const initialState = {
    token: null,
    uid: null,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case LOGIN:
        return {...payload }
    case LOGOUT:
        return initialState;
    default:
        return state
    }
}
