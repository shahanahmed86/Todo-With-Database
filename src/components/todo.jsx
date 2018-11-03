import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase';
import './config';
import CircularIndeterminate from '../containers/loader';
import AlertDialogSlide from '../containers/dialog';
import Preview from '../containers/preview';
import ButtonAppBar from '../containers/appbar';

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
            isLoading: false,
            name: '',
        }
        this.ref = firebase.database().ref();
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        })
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
            if (firebase.auth().currentUser) {
                this.setState({
                    email: firebase.auth().currentUser.email,
                })
            }
            this.setState({
                todo,
                isLoading: false,
            })
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
        this.setState({
            isLoading: true,
        })
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
                isLoading: false,
            });
        }
        else {
            this.setState({
                isLoading: false,
                dialogOpen: true,
                errorMessage: 'Field can not be left empty',
            })
        }
        this.getData();
    }

    onEditHandler = (key, ind) => {
        const { todo } = this.state;
        this.setState({
            message: todo[ind].message,
            key,
            editing: true,
            isLoading: false,
        });
    }

    onDeleteHandler = (key, ind) => {
        const { todo, uid } = this.state;
        todo.splice(ind, 1);
        this.ref.child(uid).child(key).remove();
        this.setState({
            todo,
            isLoading: false,
        })
        this.getData();
    }

    onSignOut = () => {
        this.setState({
            isLoading: true,
        });
        firebase.auth().signOut()
        .then(() => {
            this.props.history.replace('/');
            console.log('Signout Successfull');
        })
        .catch(error => {
            this.setState({
                isLoading: false,
                dialogOpen: true,
                errorMessage: error,
            })
        })
    }

    render() {
        const { message, editing, dialogOpen, todo, errorMessage, isLoading } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <ButtonAppBar
                    name={this.state.email}
                    signOut={this.onSignOut} />
                <div className={classes.alignBox}>
                    <TextField
                        label='Todo'
                        placeholder='Please type'
                        name='message'
                        value={message}
                        onChange={this.handleChange}
                        variant='standard' />
                    <Button
                        className={classes.alignBox}
                        color={editing ? 'default' : 'primary'}
                        size='small'
                        variant='contained'
                        onClick={this.onSaveHandler} >
                        {editing ? 'Update' : 'Add'}
                    </Button>
                </div>
                {isLoading ?
                    <div className={classes.motherContainer}>
                        <CircularIndeterminate />
                    </div>
                    :
                    Array.isArray(todo) && todo.length > 0 ?
                        <Preview
                            data={todo}
                            onEdit={this.onEditHandler}
                            onDelete={this.onDeleteHandler} />
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
        width: '100%',
        margin: 'auto',
        overflow: 'hidden',
        marginTop: 10,
    },
    motherContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85vw',
        height: '70vh',
    },
    alignBox: {
        margin: '15px 5px',
    }
});

TodoApp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoApp);