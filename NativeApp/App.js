import React from "react";
import { Provider } from "react-redux";

import { StatusBar } from "expo-status-bar";
import { createStore, combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { StyleSheet,LogBox } from "react-native";
import AppLoading from "expo-app-loading";

import AppNavigator from "./navigation/AppNavigator";

import userReducer from "./store/reducers/user";

LogBox.ignoreLogs(['Setting a timer']);
const App = () => {
  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_800ExtraBold,
  });

  const rootReducer = combineReducers({
    user: userReducer,
  });

  const store = createStore(rootReducer,applyMiddleware(thunk));

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
