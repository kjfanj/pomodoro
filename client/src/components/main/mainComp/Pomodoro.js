import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
      timeRemaining: 1500,
      // using
      hour: "00",
      minute: "00",
      second: "00",
      timerStartedBtn: false,

    };
    // for timer function
    this.timer = null;
  }

  componentDidMount() {

  }
  componentWillUpdate(nextProps, nextState) {

  }

  componentWillUnmount() {

  }
  componentDidUpdate = (prevProps, prevState) => {

  };

  // button
  handleStartBtn = () => {
    this.setState({
      timerStartedBtn: !this.state.timerStartedBtn
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* ROOT - overall */}
        < Grid className={classes.root} container spacing={24} align="center" >
          {/* CHILD - Label */}
          < Typography variant="h6" gutterBottom align="center" >
            TIMER
          </Typography >
          {/* CHILD - time display */}
          < Grid container spacing={24} >
            <Grid item xs={12} >
              < Typography variant="h1" gutterBottom align="center" >
                {this.state.hour}:{this.state.minute}:{this.state.second}
              </Typography >
            </Grid>
          </Grid >
          {/* CHILD - start/pause reset buttons area */}
          < Grid container spacing={24} >
            {/* filler */}
            <Grid item xs={3} >
            </Grid>
            {/* start pause button */}
            <Grid item xs={3} >
              <Button variant="contained" color="primary" onClick={this.handleStartBtn}>
                {this.state.timerStartedBtn ? "Pause" : "Start"}
              </Button>
            </Grid>
            {/* reset button */}
            <Grid item xs={3} >
              <Button variant="contained" color="primary" >
                Reset
              </Button>
            </Grid>
            {/* filler */}
            <Grid item xs={3} >
            </Grid>
          </Grid >
          {/* CHILD - objective field */}
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