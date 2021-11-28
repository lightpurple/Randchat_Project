import React from 'react';
import { Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Mypage from './pages/Mypage';
import Change_password from './pages/Change_password';

function App() {
  return (
    <div>
      <Route component={LoginPage} path={["/"]} exact/>
      <Route component={RegisterPage} path="/signup"/>
      <Route component={ChatPage} path={["/chat"]}/>
      <Route component={Mypage} path="/Mypage" exact/>
      <Route component={Change_password} path="/Mypage/Change_password"/>
    </div>
  );
}

export default App;
