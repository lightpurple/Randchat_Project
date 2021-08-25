import React, { Component } from 'react';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Chatting from './pages/Chatting';
import './App.css'

class App extends Component {
  render () {
    return (
      <div>
        <Router>
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/Chatting" component={Chatting}/>   
              <Route exact path="/SignUp" component={SignUp}/>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
