import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect, Switch } from 'react-router';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Mypage from './pages/Mypage';
import ChangePasswordpage from './pages/Change_password';

function App() {
  let isAuthorized = localStorage.getItem("isAuthorized");
  // let roomId = localStorage.getItem('roomID');
  return (
    <div>
      {!isAuthorized ? <Redirect to="/" /> : <Redirect to="/chat" />}
      {/* {roomId ? 
        <Route
          path="/chat/@:{roomId}"
          render={() => (
            <ChatPage/>
          )}
        /> : <Redirect to="/chat" />
      } */}
      <Switch>
        <Route component={LoginPage} path={["/"]} exact/>
        <Route component={ChatPage} path={["/chat",'/chat/:roomId']}
          // exact render={()=><ChatPage user}
        />
      
      
        <Route component={RegisterPage} path="/signup"/>
        
        <Route component={Mypage} path="/Mypage" exact/>

        <Route component={ChangePasswordpage} path="/Mypage/Change_password" exact/>
      </Switch>
    </div>
  );
}

export default App;
