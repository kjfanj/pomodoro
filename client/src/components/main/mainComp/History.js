import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

// imports for redux
import { connect } from 'react-redux';
import { getCompletedTask } from '../../../actions/taskAction';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});
class History extends React.Component {
  componentDidMount() {
    this.props.onGetCompletedTask()
  }

  render() {
    // console.log(this.props.displayTasks)
    const { classes } = this.props;
    const completedTaskToDisplay = this.props.displayTasks.map(task => (
      <ListItem alignItems="flex-start" key={task._id}>
        <ListItemText
          primary={"Task: " + task.objective}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                Notes:
                    </Typography>
              {" "}
              {task.note ? task.note : "None"}
            </React.Fragment>
          }
        />
        <ListItemText
          primary={task.completed ? <ThumbUpIcon /> : <ThumbDownIcon />} />
        <ListItemText
          primary={task.timer + "m"} />
        <ListItemText
          primary={"rating " + task.rating} />
        <ListItemText
          primary={"date " + task.rating} />
      </ListItem>
    ))



    return (

      <div>
        <List className={classes.root}>
          {completedTaskToDisplay}
        </List>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  displayTasks: state.task.displayTasks,
  poo: state.task.tasks
});

const mapActionsToProps = {
  onGetCompletedTask: getCompletedTask
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(History));
