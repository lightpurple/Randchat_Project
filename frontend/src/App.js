import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div>
      <Route component={LoginPage} path={["/"]} exact/>
      <Route component={RegisterPage} path="/signup" exact/>
      <Route component={ChatPage} path={["/chat"]} exact/>
    </div>
  );
}

export default App;
