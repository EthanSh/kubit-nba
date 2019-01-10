import React, { Component } from 'react';
import './App.css';
import ChartContainer from './components/ChartContainer'
import CssBaseline from '@material-ui/core/CssBaseline';


class App extends Component {
  render() {
    return (
      <div className="App">
          <CssBaseline />
          <ChartContainer />
      </div>
    );
  }
}

export default App;
