import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FolderPage } from './components/folder/folder';
// import { Link } from './components/link';
// import { HomePage } from './components/home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={FolderPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;