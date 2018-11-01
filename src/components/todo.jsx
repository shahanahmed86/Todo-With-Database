import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase';
import './config';

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            editing: false,
            todo: [],
            key: '',
            uid: props.location.state,
        }
        this.ref = firebase.database().ref();
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const { todo, uid } = this.state;
        this.ref.child(uid).on('value', snapshot => {
            const obj = snapshot.val();
            for (let key in obj) {
                obj[key].key = key;
                todo.push(obj[key]);
            }
            this.setState({ todo })
        })
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        })
    }

    onSaveHandler = () => {
        const { message, uid, todo, key, editing } = this.state;
        console.log(todo);
        if (message) {
            if (!editing) {
                const key = this.ref.child(uid).push().key;
                this.ref.child(uid).child(key).set({
                    message,
                    key,
                });
            }
            else {
                this.ref.child(uid).child(key).set({
                    message, key
                });
            }
            this.setState({
                message: '',
                key: '',
                editing: false,
            });
        }
        else {
            alert('Field can not be left empty');
        }
    }

    render() {
        const { message, editing, todo } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div>
                    <TextField
                        label='Todo'
                        placeholder='Please type'
                        name='message'
                        value={message}
                        onChange={this.handleChange}
                        variant='standard' />
                    <Button
                        className={classes.alignBox}
                        color='secondary'
                        size='small'
                        variant='contained'
                        onClick={this.onSaveHandler} >
                        {editing ? 'Update' : 'Add'}
                    </Button>
                </div>
            </div>
        );
    }
}

const styles = () => ({
    container: {
        width: '87%',
        margin: 'auto',
        overflow: 'hidden',
        marginTop: 10,
    },
    alignBox: {
        margin: '15px 5px',
    }
});

TodoApp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoApp);