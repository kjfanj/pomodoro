import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Pomodoro from './mainComp/Pomodoro';
import HistoryMain from './mainComp/History';
import SettingsMain from './mainComp/Settings';
import AboutMain from './mainComp/About';
import { connect } from 'react-redux';



const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});


class Main extends React.Component {

  render() {
    const { classes } = this.props;
    const mainToRender = this.props.state.whichMain;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>

            {mainToRender === 'Timer' && <Pomodoro />}
            {mainToRender === 'History' && <HistoryMain />}
            {mainToRender === 'Settings' && <SettingsMain />}
            {mainToRender === 'About' && <AboutMain />}

          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  state: state.ui
});

const mapActionsToProps = {
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Main));

