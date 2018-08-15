import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import asyncComponent from './asyncComponent';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import './App.css';

const Navbar = asyncComponent(() => {
  return import('./components/Layout/Navbar');
});

const Footer = asyncComponent(() => {
  return import('./components/Layout/Footer');
});

const Landing = asyncComponent(() => {
  return import('./components/Layout/Landing');
});

const Register = asyncComponent(() => {
  return import('./components/auth/Register');
});

const Login = asyncComponent(() => {
  return import('./components/auth/Login');
});

const Dashboard = asyncComponent(() => {
  return import('./components/dashboard/Dashboard');
});

const CreateProfile = asyncComponent(() => {
  return import('./components/Create-Profile/CreateProfile');
});

const EditProfile = asyncComponent(() => {
  return import('./components/edit-profile/EditProfile');
});

const EditProfile = asyncComponent(() => {
  return import('./components/edit-profile/EditProfile');
});

const AddExperience = asyncComponent(() => {
  return import('./components/add-credentials/AddExperience');
});

const AddEducation = asyncComponent(() => {
  return import('./components/add-credentials/AddEducation');
});

const Profiles = asyncComponent(() => {
  return import('./components/profiles/Profiles');
});

const Profile = asyncComponent(() => {
  return import('./components/profile/Profile');
});

const NotFound = asyncComponent(() => {
  return import('./components/notfound/NotFound');
});

const Posts = asyncComponent(() => {
  return import('./components/posts/Posts');
});

const Post = asyncComponent(() => {
  return import('./components/post/Post');
});

// Check for toekn
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode tokent and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.locaiton.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
                <PrivateRoute exact path="/feed" component={Posts} />
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
