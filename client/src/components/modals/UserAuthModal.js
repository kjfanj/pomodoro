import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

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

  responseGoogle = (response) => {
    console.log(response);
  }
  logout = (res) => {
    console.log(res)
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
              Sign in
        </Typography>
            <Divider />
            <Grid item sm={12} md={12} lg={12} style={{ width: '100%' }}>
              <Card className={classes.card}>

                <GoogleLogin
                  clientId="800094437769-us18thv7ukp3p6ohsh09lh0bqhjl6js3.apps.googleusercontent.com"
                  buttonText="using Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}

                />
                <div />
                <GoogleLogout
                  clientId="800094437769-us18thv7ukp3p6ohsh09lh0bqhjl6js3.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={this.logout}
                >
                </GoogleLogout>
              </Card>
            </Grid>
          </div>
        </Modal>
      </div>
    )
  }
}

export default withStyles(styles)(UserAuthModal);