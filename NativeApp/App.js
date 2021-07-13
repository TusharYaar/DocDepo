import React from "react";
import { Provider } from "react-redux";

import { StatusBar } from "expo-status-bar";
import { createStore, combineReducers } from "redux";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";

import AppNavigator from "./navigation/AppNavigator";

import userReducer from "./store/reducers/user";

const App = () => {
  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_800ExtraBold,
  });

  const rootReducer = combineReducers({
    user: userReducer,
  });

  const store = createStore(rootReducer);

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
