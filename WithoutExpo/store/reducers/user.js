import { LOGIN, LOGOUT, NO_USER } from "../actions/user";
const initialState = {
  email: null,
  lastLogin: null,
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
    default:
      return state;
  }
};
