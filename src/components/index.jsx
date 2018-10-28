import React, { Component } from "react";
import * as firebase from 'firebase';
import LoginPage from './login';
import './config';

class Todo extends Component {
    render() {
        console.log(firebase.database().ref());
        return(
            <div>
                <LoginPage />
            </div>
        );
    }
}

export default Todo;