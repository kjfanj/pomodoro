import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TimerIcon from '@material-ui/icons/Timer';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

});


class Pomodoro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      started: false,
      name: '',
      updateCount: 0
    };
    this.timer = null;
  }

  componentDidMount() {
    console.log("componentDidMount")
    if (this.state.started) {
      this.timer = setInterval(this.progress, 1000);
    }
  }
  componentWillUpdate(nextProps, nextState) {
    this.state.updateCount += 1
    console.log("componentWillUpdate " + this.state.updateCount)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log("componentWillUnmount " + this.state.updateCount)
  }
  componentDidUpdate = (prevProps, prevState) => {
    this.state.updateCount += 1

    console.log("componentDidUpdate " + this.state.updateCount)
    clearInterval(this.timer);
    if (this.state.started) {
      this.timer = setInterval(this.progress, 1000);
    }
  };

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      // alert("time up")
      this.setState({ completed: 0 });
    } else {
      const diff = 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  handleTimer = () => {
    this.setState({ started: !this.state.started })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };


  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>

        {/* overall */}
        < Grid className={classes.root} container spacing={24} align="center" >
          {/* Label */}
          < Typography variant="h6" gutterBottom align="center" >
            TIMER
          </Typography >
          {/* time card */}
          < Grid container spacing={24} >
            <Grid item xs={12} >

            </Grid>
          </Grid >
          {/* Fab Label */}
          < Grid container spacing={24} >
            <Grid item xs={12} >
              <Fab
                size="large"
                color="primary"
                aria-label="Timer"
                className={classes.margin}
                style={{ marginTop: 20 }}
                onClick={this.handleTimer}
              >
                <TimerIcon />
              </Fab>
            </Grid>
          </Grid >
          {/* Progress */}
          < Grid container spacing={24} >
            <Grid item xs={12}>

              <LinearProgress variant="determinate" value={this.state.completed} style={{ marginTop: 20 }} />
              <br />
            </Grid>
          </Grid >
          {/* objective field */}
          < Grid container spacing={24} >
            <Grid item xs={12}>
              <TextField
                required
                name="objective"
                label="Objective"
                fullWidth
              />
            </Grid>
          </Grid >
        </Grid >
      </React.Fragment >
    );
  }
}

Pomodoro.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pomodoro);