import React, { Component } from 'react';

const IssueCard = (props) => { 
    return (
        
      <div>
        <div onClick={() => props.handleClick(props.issues)} className="issue-card">
            <h4>{props.issues.issue_name}</h4>
        </div>
      </div>
    )

}

export default IssueCard