import React from "react";

// components
import AppNavigator from "./components/AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { buddyReducer } from "./reducers/BuddyReducer";
const store = createStore(buddyReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
