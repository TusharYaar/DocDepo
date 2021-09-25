import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_THEME = 'SET_THEME'

export const updateTheme = (theme) => {
   return async (dispatch) => {
    await AsyncStorage.setItem("@docdepo_theme", theme);
     dispatch({  type: SET_THEME,
       payload: theme
     })
    }
}
export const setInitialTheme = (theme) => ({
  type: SET_THEME,
  payload: theme 
})