import React, { Component } from 'react';
import { Redirect} from "react-router-dom";
import ProjectForm from '../components/ProjectForm'
import ProjectsContainer from '../containers/ProjectsContainer'
import { Button } from 'semantic-ui-react'
import Header from '../components/Header';


const projectsURL = "http://localhost:3000/projects"


class Home extends Component {


constructor(props) {
    super(props)
    this.token = localStorage.getItem("token")
    this.state = {
        id: props.currentUser.id,
        projects: [],
    }
}
componentDidMount(){
    
    if (this.token) {
        this.fetchProjects()
    }
}

projectHandler = (data) => {
    this.setState({ projects: [...this.state.projects, data] })
}

fetchProjects = () => {
    fetch(projectsURL, 
        {method:'GET',
         headers: {'Authorization': `Bearer ${this.token}`}
        })
    .then(res => res.json())
    .then(projects => this.setState({projects: projects.filter(project => project.user_id == this.props.currentUser.id)}))
}

deleteProject = (project) => {
    this.setState({ projects: this.state.projects.filter(newProject => newProject.id !== project.id) })
    fetch(`http://localhost:3000/projects/${project.id}`, {
      method: "DELETE", 
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        Accepts: 'application/json',
        "Content-type": 'application/json'
      }
    })
}



    
    render() { 
        if(!this.token) {
            return <Redirect to="/login"/>
        }
        return ( 
            <div id="home" className="homepage"  style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/desktop_1.jpeg'})` }}>
      
                
                <ProjectForm userId={this.state.id} newProjects={this.projectHandler}/> 
                <ProjectsContainer deleteProject={this.deleteProject} showProjectPage={this.props.showProjectPage} projects={this.state.projects}/>
            </div>
         );
    }
}
 
export default Home;