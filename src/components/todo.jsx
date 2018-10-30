import React, { Component } from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

export default function TodoApp({match}) {
    console.log(match.params.uid);
    return (
        <div>
            Todo
        </div>
    );
}