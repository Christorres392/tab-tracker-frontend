import React, { Component } from 'react';
import IssueCard from '../Cards/IssueCard';

const IssuesContainer = (props) => {
    return (
        <div className="projects-column-container">
            <div className="projects-column">
                {props.issues.map(issues => <IssueCard handleClick={props.showIssuePage} key={issues.id} issues={issues} />)}
            </div>
        </div>
    );
}

export default IssuesContainer;