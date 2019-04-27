import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimerIcon from '@material-ui/icons/Timer';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';

// for redux
import { switchMain } from '../../actions/uiAction';
import { connect } from 'react-redux';

class TemporaryDrawer extends React.Component {


  handleListClick = (e) => {
    switch (e) {
      case 'Timer':
        this.props.onSwitchMain('Timer')
        break;
      case 'History':
        this.props.onSwitchMain('History')
        break;
      case 'Settings':
        this.props.onSwitchMain('Settings')
        break;
      default:
        return;
    }
  }


  render() {
    const styles = {
      list: {
        width: 250,
      }
    };

    const sideList = (
      <div style={styles.list}>
        <List>
          {['Timer', 'History'].map((text, index) => (
            <ListItem button key={text} onClick={() => { this.handleListClick(text) }}>
              <ListItemIcon>{index % 2 === 0 ? <TimerIcon /> : <HistoryIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List >
          {['Settings'].map((text, index) => (
            <ListItem button key={text} onClick={() => { this.handleListClick(text) }}>
              <ListItemIcon>{index % 2 === 0 ? <SettingsIcon /> : <SettingsIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={this.props.drawerOpened} onClose={this.props.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.toggleDrawer}
            onKeyDown={this.props.toggleDrawer}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapActionsToProps = {
  onSwitchMain: switchMain,
}

export default connect(mapStateToProps, mapActionsToProps)(TemporaryDrawer);

