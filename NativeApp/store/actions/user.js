import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const NO_USER = "NO_USER";
export const loginUser = (payload) => {
  return async (dispatch) => {
      await AsyncStorage.setItem('@user_details', JSON.stringify(payload))
    dispatch({
      type: LOGIN,
      payload,
    });
  };
};

export const autoLoginUser = (payload) => ({
    type: LOGIN,
    payload,
})

export const logoutUser = () => ({
  type: LOGOUT,
});

export const noUser = () => ({
  type: NO_USER,
});
