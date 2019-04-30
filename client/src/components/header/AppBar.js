import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// custom components
import Drawer from '../drawer/Drawer';
import UserAuthModal from '../modals/UserAuthModal';
// import for redux
import { connect } from 'react-redux';

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpened: false,
      modalOpened: false
    }
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpened: !this.state.drawerOpened
    });
  }

  handleLogin = () => {
    // this.props.onSignUp();
    this.setState({
      modalOpened: !this.state.modalOpened
    });
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
    // console.log("App bar")
    // console.log(this.props)
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
            <Button color="inherit" onClick={this.handleLogin}>{this.props.isLoggedIn ? "Account" : "Sign in"}</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          drawerOpened={this.state.drawerOpened}
          toggleDrawer={this.toggleDrawer} />
        <UserAuthModal

          modalOpened={this.state.modalOpened}
          handleLogin={this.handleLogin}
        />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isLoggedIn: state.ui.loggedIn
});

const mapActionsToProps = {
}

export default connect(mapStateToProps, mapActionsToProps)(ButtonAppBar);

