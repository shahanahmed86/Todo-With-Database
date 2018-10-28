import React, { Component } from 'react';
import Todo from './components/index';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Todo />
      </div>
    );
  }
}

export default App;
