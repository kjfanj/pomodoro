import React, { Component } from 'react';

// custom componenets
import AppBar from '../header/AppBar';
import Main from '../main/Main';

class Overall extends Component {
  render() {
    return (
      <div>
        <header>
          <AppBar />
        </header>
        <main>
          <Main />
        </main>
      </div>
    )
  }
}

export default Overall;