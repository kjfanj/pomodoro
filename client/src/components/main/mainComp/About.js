import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default class About extends Component {
  render() {
    return (
      <div>
        <Typography>
          What is Pomodoro?
          <Button><a href={"https://en.wikipedia.org/wiki/Pomodoro_Technique"}>WIKI link</a></Button>
        </Typography>

        <Typography>
          This app's repository
        <Button><a href={"https://github.com/kjfanj/pomodoro"}>GITHUB</a></Button>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Current constraints
        </Typography>
        <Typography>
          - You cannot switch to another page while the timer is running because JS is single threaded
        </Typography>
        <Typography>
          - You need to sign in to view what tasks you have completed
        </Typography>
        <Typography>
          - The default history only shows tasks with 25 minute ran
        </Typography>
        <Typography>
          - You need to sign in to be able to save tasks in db
        </Typography>
        <Typography>
          - You have to sign in everytime you refresh the page
        </Typography>
        <Typography variant="h6" gutterBottom>
          Maybe in future
        </Typography>
        <Typography>
          - Use cookie to sign in instead of having to click login everytime
        </Typography>
        <Typography>
          - different pomodoro session type for you to customize and use
        </Typography>
        <Typography>
          - More filter in History or maybe visualize your history
        </Typography>
        <Typography>
          - Add web worker to allow you to switch page/tab
        </Typography>
        <Typography>
          - Allow custom time up sound
        </Typography>
        <Typography>
          - Allow custom time
        </Typography>
        <Typography variant="h6" gutterBottom>
          Question?
        </Typography>
        <Typography>
          - email me at tomatotimerapp@gmail.com
        </Typography>

      </div>
    )
  }
}
