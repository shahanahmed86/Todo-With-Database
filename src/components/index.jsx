import React, { Component } from "react";
// import * as firebase from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './login';
import Todo from './todo';
import './config';

class TodoWithDatabase extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={LoginPage} />
                    <Route exact path='/todo' component={Todo} />
                </div>
            </Router>
        );
    }
}

export default TodoWithDatabase;