import './App.css';
import Home from './components/Home/Home'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/Authentication/Login/LoginPage';
import Header from './components/Home/Header/Header';
import PostPage from './components/Upload/UploadPostPage'
import ProtectedRoute from './components/Route/ProtectedRoute'


function App ()
{
  return (
    <div className="app">
      <Router>
        {/* Header */ }
        <Header />
        <Switch>
          <ProtectedRoute path="/home" component={ Home } />
          <Route path="/login" component={ LoginPage } />
          <ProtectedRoute path="/posts/upload" component={ PostPage } />
          <Redirect to="/home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
