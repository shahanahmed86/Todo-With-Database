import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import './config';
import CircularIndeterminate from '../containers/loader';
import PositionedSnackbar from '../containers/snackbar';
import Preview from '../containers/preview';
import ButtonAppBar from '../containers/appbar';

const mapStateToProps = store => {
    return {
        storeData: store,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveHandler: todo => dispatch({ type: 'success', payload: todo }),
    }
}

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            dialogOpen: false,
            editing: false,
            key: '',
            uid: props.location.state,
            errorMessage: '',
            isLoading: false,
            email: '',
        }
        this.ref = firebase.database().ref();
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        })
        if (this.state.uid) {
            this.getData();
        }
        else {
            this.props.history.replace('/');
        }
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
                isLoading: false,
            });
            this.props.onSaveHandler(todo);
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
            this.onError(false, true, 'Field can not be left empty')
        }
        this.getData();
    }

    onEditHandler = (key, ind) => {
        const { storeData } = this.props;
        this.setState({
            message: storeData[ind].message,
            key,
            editing: true,
            isLoading: false,
        });
    }

    onDeleteHandler = (key, ind) => {
        const { uid } = this.state;
        this.ref.child(uid).child(key).remove();
        this.setState({
            isLoading: false,
            editing: false,
            message: '',
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
            })
            .catch(error => {
                this.onError(false, true, error)
            })
    }

    onError = (isLoading, dialogOpen, errorMessage) => {
        this.setState({ isLoading, dialogOpen, errorMessage });
    }

    render() {
        const { email, message, editing, dialogOpen, errorMessage, isLoading } = this.state;
        const { storeData } = this.props;
        const { classes } = this.props;
        console.log(this.state);
        return (
            <div className={classes.container}>
                <ButtonAppBar
                    name={email}
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
                    Array.isArray(storeData) && storeData.length > 0 ?
                        <Preview
                            data={storeData}
                            onEdit={this.onEditHandler}
                            onDelete={this.onDeleteHandler} />
                        :
                        ''
                }
                <PositionedSnackbar
                    open={dialogOpen} close={this.handleClose}
                    message={errorMessage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TodoApp));