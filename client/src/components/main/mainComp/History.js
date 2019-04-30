import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// imports for redux
import { connect } from 'react-redux';
import { getCompletedTask } from '../../../actions/taskAction';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
});

class History extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      chooseDate: true,
      chooseDuration: true
    }
  }


  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.onGetCompletedTask(this.props.user.curUser.googleId)
    }
  }

  isToday = (someDate) => {
    const today = new Date()
    return
    // eslint-disable-next-line
    someDate.getDate() == today.getDate() &&
      // eslint-disable-next-line
      someDate.getMonth() == today.getMonth() &&
      // eslint-disable-next-line
      someDate.getFullYear() == today.getFullYear()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  refresh = () => {
    if (this.props.isLoggedIn) {
      console.log("request")
      this.props.onGetCompletedTask(this.props.user.curUser.googleId)
    }
  }

  render() {
    const { classes } = this.props;

    // chain reducing based on filter
    const dateFilter = this.props.displayTasks.reduce((filtered, option) => {
      if (this.state.chooseDate) {
        if (this.isToday(new Date(option.date))) {
          filtered.push(option);
        }
      } else {
        filtered.push(option)
      }
      return filtered
    }, []);

    const durationFilter = dateFilter.reduce((filtered, option) => {
      if (this.state.chooseDuration) {
        // eslint-disable-next-line
        if (option.timer == "25") {
          filtered.push(option)
        }
      } else {
        filtered.push(option)
      }

      return filtered
    }, []);

    const completedTaskToDisplay = durationFilter.map((task, index) => (
      <Grid item key={task._id} sm={12} md={12} lg={12} style={{ width: '100%' }}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography>
              {"Task " + (index + 1) + ": " + task.objective}
            </Typography>
            <Divider />
            <Typography align="center">
              {task.completed ? <ThumbUpIcon /> : <ThumbDownIcon />}
            </Typography>
            <Typography align="center">
              {"rating: " + task.rating}
            </Typography >
            <Typography align="center">
              {Math.floor(task.timer) + " m"}
            </Typography>
            <Typography align="center">
              {"completion date: " + new Date(task.date)}
            </Typography>
            <Divider />
            <Typography>
              {task.note ? task.note : "None"}
            </Typography>
          </CardContent>

        </Card>
      </Grid>
    ))


    // console.log(reducedFilter)
    return (

      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={8} align="center">
          <Grid item xs={4} >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="show-default">Date</InputLabel>
              <Select
                value={this.state.chooseDate}
                onChange={this.handleChange}
                input={<Input name="chooseDate" />}
              >
                <MenuItem value={false}>Show all</MenuItem>
                <MenuItem value={true}>Today only</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} >
            {this.props.isLoggedIn &&
              <Button variant="contained" color="primary" onClick={this.refresh}>
                refresh
            </Button>
            }
          </Grid>
          <Grid item xs={4} >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="show-default">Duration</InputLabel>
              <Select
                value={this.state.chooseDuration}
                onChange={this.handleChange}
                input={<Input name="chooseDuration" />}
              >
                <MenuItem value={false}>All</MenuItem>
                <MenuItem value={true}>25 min</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
          {this.props.isLoggedIn ? "Total Completed: " + durationFilter.length : "Please sign in to see your history"}
        </Typography>
        <Grid container spacing={24}>
          {this.props.isLoggedIn ? completedTaskToDisplay : ""}
        </Grid>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  displayTasks: state.task.displayTasks,
  user: state.ui,
  isLoggedIn: state.ui.loggedIn
});

const mapActionsToProps = {
  onGetCompletedTask: getCompletedTask
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(History));
