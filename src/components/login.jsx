import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import * as firebase from 'firebase';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      uid: '',
      loginError: {},
      isSignIn: true,
      dialogOpen: false,
      isLoggedIn: false,
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  onLoginHandler = () => {
    const { email, password, isSignIn, loginError,  } = this.state;
    if (email.indexOf('@') !== -1 && email.indexOf('.com') !== -1) {
      if (password.length >= 6) {
        if (!isSignIn) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => {
              this.setState({
                loginError: error,
                dialogOpen: true,
              });
            })
        }
        else {
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then(resp => {
              const uid = resp.user.uid;
              this.setState({
                uid,
                isLoggedIn: true,
              });
              this.props.history.push('/todo/:uid');
            })
            .catch(error => {
              this.setState({
                loginError: error,
                dialogOpen: true,
              });
            })
        }
      }
      else {
        loginError.message = 'Password must atleast be six (06) character long';
        this.setState({
          loginError,
          dialogOpen: true,
        })
      }
    }
    else {
      loginError.message = 'Email Address must contain "@" & ".com" !';
      this.setState({
        loginError,
        dialogOpen: true,
      })
    }
  }

  changeLoginPage = () => {
    this.setState(state => ({
      isSignIn: !state.isSignIn,
    }));
  }

  transition = props => {
    return <Slide direction='left' {...props} />
  }

  handleClose = () => {
    this.setState({ dialogOpen: false });
  }

  render() {
    const { classes } = this.props;
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
              {this.state.isSignIn ? 'Login Page' : 'Sign-Up Page'}
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
        <Dialog
          open={this.state.dialogOpen}
          TransitionComponent={this.transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle id="alert-dialog-slide-title">
            {"Login Authentication !"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.state.loginError.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);