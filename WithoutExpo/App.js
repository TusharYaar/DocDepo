import React from 'react';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
// import QuickActions from "react-native-quick-actions";
import thunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';

import userReducer from './store/reducers/user';
import notesReducer from './store/reducers/notes';
import docsReducer from './store/reducers/docs';
import themeReducer from './store/reducers/theme';

// LogBox.ignoreLogs(['Setting a timer']);

enableScreens(true);

// QuickActions.setShortcutItems([
//   {
//     type: 'Orders', // Required
//     title: 'See your orders', // Optional, if empty, `type` will be used instead
//     subtitle: "See orders you've made",
//     icon: 'Compose', // Icons instructions below
//     userInfo: {
//       url: 'app://orders', // Provide any custom data like deep linking URL
//     },
//   },
// ]);

// QuickActions.clearShortcutItems();

const App = () => {
  const rootReducer = combineReducers({
    user: userReducer,
    notes: notesReducer,
    docs: docsReducer,
    theme: themeReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
