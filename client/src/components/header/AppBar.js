import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// custom components
import Drawer from '../drawer/Drawer';



class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpened: false,
    }
  }

  toggleDrawer = () => {
    this.setState(prevState => ({
      drawerOpened: !prevState.drawerOpened
    }));
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
            <Button color="inherit" >Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          drawerOpened={this.state.drawerOpened}
          toggleDrawer={this.toggleDrawer} />
      </div>
    );
  }
}

export default ButtonAppBar;