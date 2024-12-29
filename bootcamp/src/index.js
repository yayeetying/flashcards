// React Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Firebase Imports
import firebase from 'firebase/compat/app';
import { Provider } from 'react-redux';
import 'firebase/auth';
import { createStore, combineReducers} from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';

// Keep this secret!
const firebaseConfig = {
    apiKey: "AIzaSyBGLBGBkBdImVXx-NB8YsnBXYxI-iiQQFQ",
    authDomain: "flashcards-6cba4.firebaseapp.com",
    databaseURL: "https://flashcards-6cba4-default-rtdb.firebaseio.com",
    projectId: "flashcards-6cba4",
    storageBucket: "flashcards-6cba4.firebasestorage.app",
    messagingSenderId: "378725438155",
    appId: "1:378725438155:web:6b0f1428ca178bde52414e",
    measurementId: "G-M34G7XMRE4"
};

firebase.initializeApp(firebaseConfig);

// Redux store; Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
  })
  
// Create store with reducers and initial state
const store = createStore(rootReducer)

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
  }

  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
