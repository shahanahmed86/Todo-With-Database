import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as firebase from 'firebase';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isSignIn: true,
    };
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  onLoginHandler = () => {
    const { email, password, isSignIn } = this.state;
    if (isSignIn) {
      console.log({isSignIn})
    }
    else {
      console.log({isSignIn})
    }
  }
  changeLoginPage = () => {
    this.setState(state => ({
      isSignIn: !state.isSignIn,
    }));
  }
  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <div className={classes.motherContainer}>
        <Typography
          variant='h4'
          align='center'
          color='secondary' >
          TODO App
        </Typography>
        <Typography
          variant='h6'
          align='center'
          color='textSecondary' >
          Affiliate with Firebase Database
        </Typography>
        <Card className={classes.container}>
          <CardContent>
            <Typography
              variant='h5'
              align='center'
              color='textPrimary' >
              Login Page
            </Typography>
            <TextField
              label="Email"
              type='email'
              placeholder='Please enter...'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth={true}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              type='password'
              placeholder='Please enter...'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth={true}
              margin="normal"
              variant="outlined"
            />
          </CardContent>
          <CardActions>
            <Button
              className={classes.centerBox}
              size='medium'
              color='primary'
              variant='contained'
              type='submit'
              onClick={this.onLoginHandler} >
              {this.state.isSignIn ? 'Sign-In' : 'Sign-Up'}
            </Button>
          </CardActions>
          <CardActions>
            <div className={classes.centerBox}>
              <Typography
                variant='h6'
                align='center'
                color='textSecondary' >
                {this.state.isSignIn ? "Don't have an account" : 'Have already an account ?'}
            </Typography>
              <Button
                size='small'
                color='secondary'
                variant='outlined'
                onClick={this.changeLoginPage} >
                {this.state.isSignIn ? 'Sign-Up' : 'Sign-In'}
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const styles = () => ({
  motherContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },
  container: {
    maxWidth: 400,
    minHeight: 300,
  },
  centerBox: {
    margin: 'auto',
    textAlign: 'center',
  },
});

Todo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Todo);