import React from "react";
import { LogBox } from "react-native";
import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
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
import notesReducer from "./store/reducers/notes";
import docsReducer from "./store/reducers/docs"

LogBox.ignoreLogs(['Setting a timer']);

enableScreens(true);

const App = () => {
  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
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
      <StatusBar style="dark" />
      <PaperProvider>
      <AppNavigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;
