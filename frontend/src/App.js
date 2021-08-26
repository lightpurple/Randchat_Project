import { Route } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div>
      <Route component={LoginPage} path={["/","/login"]} exact/>
      <Route component={RegisterPage} path="/register" exact/>
      <Route component={ChatPage} path={["/chat","/@:username"]}/>
    </div>
  );
}

export default App;
