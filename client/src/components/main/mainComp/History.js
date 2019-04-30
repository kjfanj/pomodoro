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
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.onGetCompletedTask(this.props.user.curUser.googleId)
    }
  }
  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.onGetCompletedTask(this.props.user.curUser.googleId)
    }
  }

  handleDoubleClick = () => {
    // maybe implement delete
    // console.log("clickclick")
  }

  render() {
    // console.log(this.props.displayTasks)
    const { classes } = this.props;
    const completedTaskToDisplay = this.props.displayTasks.map((task, index) => (

      <Grid item key={task._id} sm={12} md={12} lg={12} style={{ width: '100%' }}>
        <Card className={classes.card} onDoubleClick={this.handleDoubleClick}>
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
              {task.timer + " m"}
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
    return (

      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
          {this.props.isLoggedIn ? "Total Completed: " + this.props.displayTasks.length : "Please sign in to see your history"}
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
