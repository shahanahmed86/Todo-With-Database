import React, { Component } from 'react';
import Todo from './components/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.css';

let initialState = [];
const storeData = (state = initialState, action) => {
  switch (action.type) {
    case 'success': {
      return state = action.payload;
    }
    default: {
      return state;
    }
  }
}

let store = createStore(storeData)

store.subscribe(() => {
  console.log('reducer', store.getState());
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Todo />
        </div>
      </Provider>
    );
  }
}

export default App;