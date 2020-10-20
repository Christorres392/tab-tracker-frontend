import React, { Component } from 'react';
import { Router, Switch, Route, Link, useHistory } from "react-router-dom";
import ProjectForm from '../components/ProjectForm'
import ProjectsContainer from '../containers/ProjectsContainer'
import { Button } from 'semantic-ui-react'
import Header from '../components/Header';


const projectsURL = "http://localhost:3000/projects"


class Home extends Component {

state = {
    id: this.props.currentUser.id,
    projects: [],
}

componentDidMount(){
    this.fetchProjects()
}

projectHandler = (data) => {
    this.setState({ projects: [...this.state.projects, data] })
}

fetchProjects = () => {
    fetch(projectsURL, 
        {method:'GET',
         headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        })
    .then(res => res.json())
    .then(projects => this.setState({projects: projects.filter(project => project.user_id == this.props.currentUser.id)}))
}



    
    render() { 
        return ( 
            <div id="home" className="homepage"  style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/desktop_1.jpeg'})` }}>
      
                
                <ProjectForm userId={this.state.id} newProjects={this.projectHandler}/> 
                <ProjectsContainer deleteProject={this.deleteProject} showProjectPage={this.props.showProjectPage} projects={this.state.projects}/>
            </div>
         );
    }
}
 
export default Home;