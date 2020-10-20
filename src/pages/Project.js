import React, { Component } from 'react';
import IssueForm from '../components/IssueForm'
import IssuesContainer from '../containers/IssuesContainer';


const issuesURL = "http://localhost:3000/issues"

class Project extends Component {

    state = {
        issues: []
    }

    componentDidMount() {
        this.fetchIssues()
    }

    fetchIssues = () => {
        fetch(issuesURL,
            {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => res.json())
            .then(issues => this.setState({ issues: issues.filter(issue => issue.project_id == this.props.project.id) }))
    }

    projectHandler = (data) => {
        this.setState({ issues: [...this.state.issues, data] })
    }

    render() {
        return (
            <div className="project" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/desktop_5.jpeg'})` }}>
                <div>
                    <h1>{this.props.project.project_name}</h1>
                    <IssueForm project={this.props.project} newIssues={this.projectHandler} />
                    <IssuesContainer showIssuePage={this.props.showIssuePage} issues={this.state.issues} />
                </div>
            </div>
        );
    }
}

export default Project;