import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const NO_USER = "NO_USER";
export const AUTO_LOGIN = "AUTO_LOGIN";
export const loginUser = (payload) => {
  return async (dispatch) => {
    await AsyncStorage.setItem("@user_details", JSON.stringify(payload));
    dispatch({ type: LOGIN, payload });
  };
};

export const autoLoginUser = (payload) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN, payload });
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  return AsyncStorage.removeItem("@user_details");
};

export const noUser = () => ({
  type: NO_USER,
});
