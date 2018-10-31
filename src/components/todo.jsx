import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            editing: false,
            todo: [],
            uid: props.location.state,
        }
    }
    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        })
    }
    render() {
        const { message, editing } = this.state;
        return (
            <div>
                <div>
                    <TextField
                        label='Todo'
                        placeholder='Please type'
                        name='message'
                        value={message}
                        onChange={this.handleChange}
                        variant='filled' />
                    <Button
                        color='secondary'
                        size='small'
                        variant='contained' >
                        {editing ? 'Update' : 'Add'}
                    </Button>
                </div>
            </div>
        );
    }
}

export default TodoApp;