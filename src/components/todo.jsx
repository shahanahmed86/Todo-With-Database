import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AlertDialogSlide from './dialog';
import * as firebase from 'firebase';
import './config';
import Preview from './preview';

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            dialogOpen: false,
            editing: false,
            todo: [],
            key: '',
            uid: props.location.state,
            errorMessage: '',
        }
        this.ref = firebase.database().ref();
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const { uid } = this.state;
        this.ref.child(uid).on('value', snapshot => {
            const obj = snapshot.val();
            const todo = [];
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

    handleClose = () => {
        this.setState({
            dialogOpen: false,
        })
    }

    onSaveHandler = () => {
        const { message, uid, key, editing } = this.state;
        if (message) {
            if (!editing) {
                const key = this.ref.child(uid).push().key;
                this.ref.child(uid).child(key).set({
                    message, key,
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
            this.setState({
                dialogOpen: true,
                errorMessage: 'Field can not be left empty',
            })
        }
    }

    onEditHandler = (key, ind) => {
        const {todo} = this.state;
        this.setState({
            message: todo[ind].message,
            key,
            editing: true,
        });
    }

    onDeleteHandler = (key, ind) => {
        const {todo, uid} = this.state;
        todo.splice(ind, 1);
        this.ref.child(uid).child(key).remove();
    }

    render() {
        const { message, editing, dialogOpen, todo, errorMessage } = this.state;
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
                {Array.isArray(todo) && todo.length > 0 ?
                    <div>
                        <Preview
                            data={todo}
                            onEdit={this.onEditHandler}
                            onDelete={this.onDeleteHandler}
                            />
                    </div>
                    :
                    ''
                }
                <div>
                    <AlertDialogSlide
                        open={dialogOpen} close={this.handleClose} title='Todo Alert Box'
                        message={errorMessage} />
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