import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// imports for redux
import { connect } from 'react-redux';
import { addTask } from '../../../actions/taskAction';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class Pomodoro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // for functionality
      timeRemaining: 1500,
      timeIsUp: false,
      timerStarted: false,
      hour: "00",
      minute: "00",
      second: "00",
      // for stuff that goes to database
      chooseTime: "",
      chooseCompleted: true,
      chooseRating: 100,
      objective: "",
      note: "",
      showSaveBtn: false
    };
  }

  componentDidMount() {
    let displayRemTime = this.convRemTimeToDisplay(this.state.timeRemaining)
    this.setState({
      minute: displayRemTime.curMin,
      second: displayRemTime.curSec,
    })
  }

  // stop interval from running when switching pages
  componentWillUnmount() {
    clearInterval(this.countDownTimer);
  }

  // return the remaining time in an object with min:sec to display
  convRemTimeToDisplay = (remTimeInSecond) => {
    let curMin = Math.floor(remTimeInSecond / 60);
    let curSec = remTimeInSecond % 60;
    if (curMin < 10) {
      curMin = "0" + curMin.toString();
    }
    if (curSec < 10) {
      curSec = "0" + curSec.toString();
    }
    return { curMin, curSec };
  }

  // return the selected time in minutes and return in second
  convSelTimeToRemTime = (selTime) => (selTime * 60);


  // button for start pause
  handleStartBtn = () => {
    // toggle between start and pause
    this.setState({
      timerStarted: !this.state.timerStarted
    })
    // if timer has not been started, run the timer with interval
    if (!this.state.timerStarted) {
      this.countDownTimer = setInterval(this.countDown, 1000)
    }
    // pause if timer has been started
    if (this.state.timerStarted) {
      clearInterval(this.countDownTimer)
    }
  }

  handleResetBtn = () => {
    this.resetAll()
  }

  // hard reset everything
  resetAll = () => {
    clearInterval(this.countDownTimer)
    this.setState({
      timeIsUp: false,
      timeRemaining: 1500,
      timerStarted: false,
      objective: "",
      note: "",
      hour: "00",
      minute: "25",
      second: "00",
      chooseCompleted: true,
      chooseRating: 100,
      showSaveBtn: false
    })
  }

  countDown = () => {
    let displayRemTime = this.convRemTimeToDisplay(this.state.timeRemaining);

    // time is not up
    if (this.state.timeRemaining >= 0) {
      this.setState({
        timeRemaining: this.state.timeRemaining - 1,
        minute: displayRemTime.curMin,
        second: displayRemTime.curSec
      })
    } else {
      // time is up
      new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3').play();
      this.setState({
        timeIsUp: true,
        showSaveBtn: true
      })
      clearInterval(this.countDownTimer)
    }
  }

  handleChange = event => {
    if (event.target.name === 'chooseTime') {
      this.handleResetBtn()
      let remTime = this.convSelTimeToRemTime(event.target.value);
      let displayRemTime = this.convRemTimeToDisplay(remTime);
      this.setState({
        timeRemaining: remTime,
        minute: displayRemTime.curMin,
        second: displayRemTime.curSec
      })
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleTextChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  saveTask = () => {
    const completedTask = {
      objective: this.state.objective,
      timer: this.state.chooseTime,
      completed: this.state.chooseCompleted,
      rating: this.state.chooseRating,
      note: this.state.note,
      googleId: this.props.googleId
    }
    this.props.onAddTask(completedTask)
    this.resetAll()
  }


  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* ROOT - overall */}
        < Grid className={classes.root} container spacing={8} align="center" >
          {/* CHILD - Label */}
          <Grid item xs={12} >
            < Typography variant="h6" gutterBottom align="center"  >
              TIMER
          </Typography >
          </Grid>

          {/* CHILD - time display */}
          <Grid item xs={12} >
            < Typography variant="h2" gutterBottom align="center" >

              {this.state.hour}:{this.state.minute}:{this.state.second}
            </Typography >
          </Grid>
          {/* CHILD - start/pause reset buttons area */}
          < Grid container spacing={24} >
            {/* filler */}
            <Grid item xs={3} >
            </Grid>
            {/* start pause button */}
            <Grid item xs={3} >
              <Button variant="contained" color="primary" onClick={this.handleStartBtn}>
                {this.state.timerStarted ? "Pause" : "Start"}
              </Button>
            </Grid>
            {/* reset button */}
            <Grid item xs={3} >
              <Button variant="contained" color="primary" onClick={this.handleResetBtn}>
                Reset
              </Button>
            </Grid>
            {/* filler */}
            <Grid item xs={3} >
            </Grid>
          </Grid>
          {/* CHILD - objective field */}
          <Grid item xs={12}>
            <TextField
              name="objective"
              label="Objective"
              value={this.state.objective}
              onChange={this.handleTextChange}
              autoFocus
              rowsMax={2}
              style={{ width: "70%" }}
              multiline
            />
          </Grid>
          {/* CHILD - note field */}
          <Grid item xs={12}>
            <TextField
              name="note"
              placeholder="note"
              value={this.state.note}
              onChange={this.handleTextChange}
              multiline
              fullWidth
              rowsMax={5}
            />
          </Grid>
          {/* CHILD - completed field */}
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="show-default">Completed?</InputLabel>
              <Select
                value={this.state.chooseCompleted}
                onChange={this.handleChange}
                input={<Input name="chooseCompleted" />}
              >
                <MenuItem value={true} defaultValue>YES</MenuItem>
                <MenuItem value={false}>NO</MenuItem>
              </Select>
              <FormHelperText>Be true to yourself</FormHelperText>
            </FormControl>
          </Grid>
          {/* CHILD - rating field */}
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="show-default">Grade yourself</InputLabel>
              <Select
                value={this.state.chooseRating}
                onChange={this.handleChange}
                input={<Input name="chooseRating" />}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={70}>70</MenuItem>
                <MenuItem value={80}>80</MenuItem>
                <MenuItem value={90}>90</MenuItem>
                <MenuItem value={100} defaultValue>100</MenuItem>
              </Select>
              <FormHelperText>You know you 100</FormHelperText>
            </FormControl>
          </Grid>
          {/* CHILD - save and send to server */}
          {(this.props.isLoggedIn && this.state.timeIsUp && this.state.showSaveBtn) &&
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={this.saveTask}>
                save
          </Button>
            </Grid>}

          {/* CHILD - time selector */}
          {!this.state.timerStarted &&
            <Grid item xs={12} >
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="show-default">Select Time Here</InputLabel>
                <Select
                  value={this.state.chooseTime}
                  onChange={this.handleChange}
                  input={<Input name="chooseTime" />}
                >
                  <MenuItem value={1 / 60}>1 sec(for testing)</MenuItem>
                  <MenuItem value={3}>3 min</MenuItem>
                  <MenuItem value={5}>5 min</MenuItem>
                  <MenuItem value={25}>25 min</MenuItem>
                </Select>
                <FormHelperText>Selecting a time will restart</FormHelperText>
              </FormControl>
            </Grid>
          }



        </Grid >
      </React.Fragment >
    );
  }
}

Pomodoro.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.ui.loggedIn,
  googleId: state.ui.curUser.googleId
});

const mapActionsToProps = {
  onAddTask: addTask,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Pomodoro));

