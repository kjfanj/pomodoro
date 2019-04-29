import React from 'react';
import PropTypes from 'prop-types';
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
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});
class History extends React.Component {
  componentDidMount() {
    this.props.onGetCompletedTask()
  }

  render() {
    // console.log(this.props.displayTasks)
    const { classes } = this.props;
    console.log(this.props.displayTasks)
    const completedTaskToDisplay = this.props.displayTasks.map(task => (

      <Grid item key={task._id} sm={12} md={12} lg={12} style={{width: '100%'}}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography>
              {"Task: " + task.objective}
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
              {task.date}
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
        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
          Total Completed: {this.props.displayTasks.length}
        </Typography>
        <Grid container spacing={40}>
          {completedTaskToDisplay}
        </Grid>
      </div >
    );

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
