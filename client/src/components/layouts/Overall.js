import React from 'react';

// custom componenets
import AppBar from '../header/AppBar';
import Main from '../main/Main';

class Overall extends React.Component {


  render() {
    return (
      <div>
        <AppBar />
        <Main />
      </div>
    )
  }
}

export default Overall;