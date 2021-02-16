import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Project from './pages/Project'
import Issue from './pages/Issue'

import ProjectForm from './components/ProjectForm'

import { Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from './components/Header';


const history = createBrowserHistory();

class App extends Component {

  state ={
    loggedInStatus: "LOGGED_OUT",
    user: JSON.parse(localStorage.getItem("user")) || [],
    project: JSON.parse(localStorage.getItem("project")) || [], 
    issue: JSON.parse(localStorage.getItem("issue")) || []
  }


  handleLogin = (data) => {
    this.setState({loggedInStatus: "LOGGED_IN", user: data.user})
  }

  handleLogout = (data) => {
    this.setState({loggedInStatus: "LOGGED_OUT", user: []})
    localStorage.clear()
    history.replace("/login")
  }

  showProjectPage = (project) => {
   this.setState({project: project})
   localStorage.setItem("project", JSON.stringify(project))
    history.push('/project')
  }

  showIssuePage = (issue) => {
    this.setState({issue: issue})
    localStorage.setItem("issue", JSON.stringify(issue))
     history.push('/issue')
   }


  
  render() { 
    return ( 
      
      
      <div>
        
        <Router history={history}>
        <Header handleLogout={this.handleLogout}/>
          <Switch>
            
            <Route exact path="/" render={props => (<Home {...props} showProjectPage={this.showProjectPage} currentUser={this.state.user}/>)}/>
              
             

            <Route exact path='/login' render={props => (<Login {...props} handleLogin={this.handleLogin}/>)}/>

            <Route exact path='/signup'>
              <SignUp />
            </Route>

            <Route exact path='/project'>
              <Project showIssuePage={this.showIssuePage} project={this.state.project}/>
            </Route>

            <Route exact path='/issue'>
              <Issue issue={this.state.issue}/>
            </Route>



          </Switch>
        </Router>
        
      </div>
      
     );
  }
}
 
export default App;
