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
import CircularIndeterminate from '../containers/loader';
import AlertDialogSlide from '../containers/dialog';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      email: '',
      password: '',
      errorState: false,
      isSignIn: true,
      dialogOpen: false,
      loginError: {},
      success: '',
      isLoading: false,
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  onLoginHandler = () => {
    const { email, password, isSignIn, loginError, } = this.state;
    this.setState({
      isLoading: true
    })
    if (email.indexOf('@') !== -1 && email.indexOf('.com') !== -1) {
      if (password.length >= 6) {
        if (!isSignIn) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              this.setState({
                errorState: false,
                success: 'Email Address Successfully Made',
                dialogOpen: true,
                isSignIn: true,
                email: '',
                password: '',
                isLoading: false,
              })
            })
            .catch(error => {
              this.setState({
                errorState: true,
                loginError: error,
                dialogOpen: true,
                isLoading: false,
              });
            })
        }
        else {
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then(resp => {
              const uid = resp.user.uid;
              this.setState({
                uid,
                isLoading: false,
                errorState: false,
              });
              this.props.history.push('/todo', uid);
            })
            .catch(error => {
              this.setState({
                loginError: error,
                errorState: true,
                dialogOpen: true,
                isLoading: false,
              });
            })
        }
      }
      else {
        loginError.message = 'Password must atleast be six (06) character long';
        this.setState({
          loginError,
          errorState: true,
          dialogOpen: true,
          isLoading: false,
        })
      }
    }
    else {
      loginError.message = 'Email Address must contain "@" & ".com" !';
      this.setState({
        loginError,
        errorState: true,
        dialogOpen: true,
        isLoading: false,
      })
    }
  }

  changeLoginPage = () => {
    this.setState(state => ({
      isSignIn: !state.isSignIn,
    }));
  }

  handleClose = () => {
    this.setState({
      dialogOpen: false,
    })
  }

  render() {
    const { classes } = this.props;
    const { email, password, errorState, loginError, success, dialogOpen, isSignIn, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className={classes.motherContainer}>
          <CircularIndeterminate />
        </div>
      )
    }
    else {
      return (
        <div className={classes.motherContainer}>
          <Typography
            variant='h4'
            align='center'
            color='secondary' >
            Todo App
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
                {isSignIn ? 'Login Page' : 'Sign-Up Page'}
              </Typography>
              <TextField
                label="Email"
                type='email'
                placeholder='Please enter...'
                name='email'
                value={email}
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
                value={password}
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
                {isSignIn ? 'Sign-In' : 'Sign-Up'}
              </Button>
            </CardActions>
            <CardActions>
              <div className={classes.centerBox}>
                <Typography
                  variant='h6'
                  align='center'
                  color='textSecondary' >
                  {isSignIn ? "Don't have an account" : 'Have already an account ?'}
                </Typography>
                <Button
                  size='small'
                  color='secondary'
                  variant='outlined'
                  onClick={this.changeLoginPage} >
                  {isSignIn ? 'Sign-Up' : 'Sign-In'}
                </Button>
              </div>
            </CardActions>
          </Card>
          <AlertDialogSlide
            open={dialogOpen} close={this.handleClose} title='Login Authentication !'
            message={errorState ? loginError.message : success} />
        </div>
      );
    }
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);