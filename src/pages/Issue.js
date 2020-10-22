import React, { Component } from 'react';
import ReferenceForm from '../components/ReferenceForm';
import ReferencesContainer from '../containers/ReferencesContainer';
import ReferenceUrlContainer from '../containers/ReferenceUrlContainer';

const referencesURL = "http://localhost:3000/references"

class Issue extends Component {
    

state = {
    references: []
}

componentDidMount() {
    this.fetchReferences()
}

fetchReferences = () => {
    fetch(referencesURL, 
        {method:'GET',
         headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        })
    .then(res => res.json())
    .then(references => this.setState({references: references.filter(reference => reference.issue_id == this.props.issue.id)}))
}

    referenceHandler = (data) => {
        this.setState({ references: [...this.state.references, data] })
    }

    render() { 
        return ( 
            <div className="issue" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/desktop_3.jpeg'})` }}>
                <h2>{this.props.issue.issue_name}</h2>
                <ReferenceForm issue={this.props.issue} newReferences={this.referenceHandler}/>
                <ReferencesContainer references={this.state.references}/>
                <ReferenceUrlContainer references={this.state.references}/>
            </div>
         );
    }
}
 
export default Issue;