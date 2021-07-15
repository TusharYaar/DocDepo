import React from "react";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Provider } from "react-redux";
import { createStore, combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import AppLoading from "expo-app-loading";

import AppNavigator from "./navigation/AppNavigator";

import userReducer from "./store/reducers/user";
import notesReducer from "./store/reducers/notes"

LogBox.ignoreLogs(['Setting a timer']);
const App = () => {
  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_800ExtraBold,
  });

  const rootReducer = combineReducers({
    user: userReducer,
    notes: notesReducer,
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

export default App;
