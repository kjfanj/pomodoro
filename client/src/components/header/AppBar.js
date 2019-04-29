import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
// custom components
import Drawer from '../drawer/Drawer';

// import for redux
import { signUp } from '../../actions/uiAction'
import { connect } from 'react-redux';

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpened: false,
    }
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpened: !this.state.drawerOpened
    });
  }

  handleLogin = () => {
    this.props.onSignUp();
  }

  responseGoogle = (response) => {
    console.log(response);
  }
  logout = (res) => {
    console.log(res)
  }

  render() {

    const styles = {
      root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
    };
    console.log("App bar")
    console.log(this.props)
    return (
      <div style={styles.root} >

        <AppBar position="static">
          <Toolbar>
            <IconButton style={styles.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" style={styles.grow}>
              Pomodoro Timer
          </Typography>
            <Button color="inherit" onClick={this.handleLogin}>Login</Button>
            {/* <Button color="inherit" >Login</Button> */}
            <GoogleLogin
              clientId="800094437769-uuub6j5c5mhtvncoimbruojin1kgm972.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <GoogleLogout
              clientId="800094437769-uuub6j5c5mhtvncoimbruojin1kgm972.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={this.logout}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            >
            </GoogleLogout>
          </Toolbar>
        </AppBar>
        <Drawer
          drawerOpened={this.state.drawerOpened}
          toggleDrawer={this.toggleDrawer} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state: state
});

const mapActionsToProps = {
  onSignUp: signUp,
}

export default connect(mapStateToProps, mapActionsToProps)(ButtonAppBar);

