import { LOGIN, LOGOUT, NO_USER, AUTO_LOGIN } from "../actions/user";
const initialState = {
  accessToken: null,
  expirationTime: null,
  email: null,
  apiKey: null,
  autoLogin: false,
  uid: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...payload };
    case LOGOUT:
      return { ...initialState };
    case NO_USER: {
      return { ...initialState };
    }
    case AUTO_LOGIN: {
      return { ...initialState, autoLogin: true };
    }
    default:
      return state;
  }
};
