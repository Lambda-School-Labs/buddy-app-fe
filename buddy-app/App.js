import React from 'react';

// components
import AppNavigator from './components/AppNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BuddyReducer from './reducers/BuddyReducer';
const store = createStore(BuddyReducer)

export default function App() {
  return <Provider store={store}><AppNavigator /></Provider>;
}
