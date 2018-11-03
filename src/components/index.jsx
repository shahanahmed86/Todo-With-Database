import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LoginPage from './login';
import TodoApp from './todo';

class TodoWithDatabase extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Router>
                    <div>
                        <Route exact path='/' component={LoginPage} />
                        <Route exact path='/todo' component={TodoApp} />
                    </div>
                </Router>
            </div>
        );
    }
}

const styles = () => ({
    container: {
        width: '85%',
        margin: 'auto',
        overflow: 'hidden',
    },
});

TodoWithDatabase.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoWithDatabase);