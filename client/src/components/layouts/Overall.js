import React from 'react';

// custom componenets
import AppBar from '../header/AppBar';
import Main from '../main/Main';
import Footer from '../footer/Footer'
class Overall extends React.Component {


  render() {
    return (
      <div>
        <AppBar />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default Overall;