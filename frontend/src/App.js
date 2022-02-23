import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Mainpage from './pages/MainPage';
import Mypage from './pages/Mypage';
import ChangePasswordpage from './pages/Change_password';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div>
      <Switch>
        <Route component={LoginPage} path={["/"]} exact/>
        <Route component={RegisterPage} path="/signup"/>
        <PrivateRoute component={ChatPage} path={["/chat/:roomId"]}/>
        <PrivateRoute component={Mainpage} path="/main"/>
        <PrivateRoute component={Mypage} path="/Mypage" exact/>
        <PrivateRoute component={ChangePasswordpage} path="/Mypage/Change_password" exact/>
      </Switch>
    </div>
  );
}

export default App;
