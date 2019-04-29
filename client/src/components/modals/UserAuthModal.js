import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

// imports for redux
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions/uiAction'

function getModalStyle() {
  return {
    top: 'auto',
    margin: 'auto'
  };
}

const styles = theme => ({
  paper: {
    position: 'relative',
    width: theme.spacing.unit * 50,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,

  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

class UserAuthModal extends React.Component {

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // holds
  // response.profileObj.email
  //                     familyName
  //                     givenName
  //                     googleId
  //                     name     
  // on success             
  responseGoogle = (response) => {
    if (response.error) {
      console.log(response.error);
    } else {
      // google says yes, log user in
      this.props.onSignIn(response.profileObj)
      this.props.handleLogin()
    }
  }
  // will only trigger when user is logging out while logged in
  logoutSuccess = () => {
    // log user out
    this.props.onSignOut();
    this.props.handleLogin()
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          open={this.props.modalOpened}
          onClose={this.props.handleLogin}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={getModalStyle()} className={classes.paper} >
            <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
              {this.props.state.loggedIn ? "You are logged in" : "Sign in"}
            </Typography>
            <Divider />
            <Grid item sm={12} md={12} lg={12} style={{ width: '100%' }}>
              <Card className={classes.card}>
                {!this.props.state.loggedIn && <GoogleLogin
                  clientId="800094437769-us18thv7ukp3p6ohsh09lh0bqhjl6js3.apps.googleusercontent.com"
                  buttonText="using Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />}

                <div />
                {this.props.state.loggedIn && (<GoogleLogout
                  clientId="800094437769-us18thv7ukp3p6ohsh09lh0bqhjl6js3.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={this.logoutSuccess}
                  onClick={this.handleClick}
                >
                </GoogleLogout>)}
              </Card>
            </Grid>
          </div>
        </Modal>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  state: state.ui
});

const mapActionsToProps = {
  onSignIn: signIn,
  onSignOut: signOut
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UserAuthModal));
