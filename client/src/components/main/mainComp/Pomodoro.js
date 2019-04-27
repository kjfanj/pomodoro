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
      timeRemaining: 1500,
      chooseTime: "",
      timerStarted: false,
      hour: "00",
      minute: "00",
      second: "00",
    };
  }

  componentDidMount() {
    let displayRemTime = this.convRemTimeToDisplay(this.state.timeRemaining)
    this.setState({
      minute: displayRemTime.curMin,
      second: displayRemTime.curSec,
    })
  }


  // return the remaining time in an object with min:sec to display
  convRemTimeToDisplay = (remTimeInSecond) => {
    let curMin = Math.floor(remTimeInSecond / 60);
    let curSec = remTimeInSecond % 60;
    if (curMin < 10) {
      curMin = "0" + curMin.toString()
    }
    if (curSec < 10) {
      curSec = "0" + curSec.toString()
    }
    // console.log(`${curMin} : ${curSec}`)
    return { curMin, curSec }
  }

  // return the selected time in minutes and return in second
  convSelTimeToRemTime = (selTime) => {
    return selTime * 60;
  }

  // button
  handleStartBtn = () => {
    this.setState({
      timerStarted: !this.state.timerStarted
    })
    if (!this.state.timerStarted) {
      this.countDownTimer = setInterval(this.countDown, 1000)
    }
    if (this.state.timerStarted) {
      // console.log("clearing interval")
      clearInterval(this.countDownTimer)
    }
  }

  handleResetBtn = () => {
    this.setState({
      timeRemaining: 1500,
      timerStarted: false,
      // using
      hour: "00",
      minute: "25",
      second: "00",

    })
    if (this.countDownTimer) {
      clearInterval(this.countDownTimer)
    }
  }

  countDown = () => {

    // console.log("countdown running")
    // console.log(this.state.timeRemaining)
    let displayRemTime = this.convRemTimeToDisplay(this.state.timeRemaining);

    if (this.state.timeRemaining >= 0) {
      this.setState({
        timeRemaining: this.state.timeRemaining - 1,
        minute: displayRemTime.curMin,
        second: displayRemTime.curSec
      })

    }
  }

  handleChange = event => {
    this.handleResetBtn()
    if (event.target.name === 'chooseTime') {
      let remTime = this.convSelTimeToRemTime(event.target.value);
      let displayRemTime = this.convRemTimeToDisplay(remTime);
      console.log(remTime)
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

  handleTest = () => {
    const testObj = {
      objective: "from test",
      timer: "25",
      completed: true,
      rating: 10,
      notes: "work"
    }
    this.props.onAddTask(testObj)
    console.log("called addTask from pomodoro")
  }


  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* ROOT - overall */}
        < Grid className={classes.root} container spacing={24} align="center" >
          {/* CHILD - Label */}
          < Typography variant="h6" gutterBottom align="center"  >
            TIMER
          </Typography >
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
              autoFocus
              rowsMax={2}
              style={{ width: "70%" }}
              multiline
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="note"
              placeholder="note"
              multiline
              fullWidth
              rowsMax={5}
            />
          </Grid>

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
                  <MenuItem value={1}>1 min</MenuItem>
                  <MenuItem value={5}>5 min</MenuItem>
                  <MenuItem value={25}>25 min</MenuItem>
                  <MenuItem value={45}>45 min</MenuItem>
                </Select>
                <FormHelperText>Selecting a time will restart</FormHelperText>
              </FormControl>
            </Grid>
          }


          <Button variant="contained" color="primary" onClick={this.handleTest}>
            TEST BTN
              </Button>
        </Grid >
      </React.Fragment >
    );
  }
}

Pomodoro.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  // product: state.product,
  // user: state.user
});


// user onUpdateUser to prevent var collision when destructuring
const mapActionsToProps = {
  onAddTask: addTask,
}


// export default connect(mapStateToProps, mapActionsToProps, mergeProps)(App);
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Pomodoro));

