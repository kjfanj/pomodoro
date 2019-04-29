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

      </div>
    )
  }
}
