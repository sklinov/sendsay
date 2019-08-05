import React from 'react';
import { Provider } from "react-redux";
import createStore from './redux/store/createStore';

import './App.css';
import Logo from './components/Logo'
import Form from './components/Form'
import SentMessages from './components/SentMessages'

const store = createStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Logo />
        <Form />
        <SentMessages />
      </Provider>
    </div>
  );
}

export default App;
