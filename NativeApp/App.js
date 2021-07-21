import React, {useState} from "react";
import { LogBox } from "react-native";
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider, } from 'react-native-paper';
import { Provider } from "react-redux";
import { createStore, combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import THEMES from "./themes";


import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";

import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "./navigation/AppNavigator";

import userReducer from "./store/reducers/user";
import notesReducer from "./store/reducers/notes";
import docsReducer from "./store/reducers/docs"

LogBox.ignoreLogs(['Setting a timer']);

enableScreens(true);

const App = () => {
  const [currentTheme,setCurrentTheme] =useState("darkTheme");
  let [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const rootReducer = combineReducers({
    user: userReducer,
    notes: notesReducer,
    docs: docsReducer,
  });

  const store = createStore(rootReducer,applyMiddleware(thunk));

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <StatusBar style={THEMES[currentTheme].dark ? "light": "dark"} />
      <PaperProvider theme={THEMES[currentTheme]}>
      <AppNavigator theme={THEMES[currentTheme]} />
      </PaperProvider>
    </Provider>
  );
};

export default App;
