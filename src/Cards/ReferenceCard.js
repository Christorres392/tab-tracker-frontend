import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { ReactTinyLink } from "react-tiny-link";

const ReferenceCard = (props) => {
    return (

        <div>
            <div className="reference-card">
                <h4>{props.references.note}</h4>
                <div className="tiny-link">
                    <ReactTinyLink
                        cardSize="small"
                        showGraphic={true}
                        maxLine={2}
                        minLine={1}
                        url={props.references.url}
                    />
                </div>
                <div class="box">
                    <object data={props.references.url} width="400" height="300" type="text/html"> </object>
                </div>
            </div>
        </div>
    )

}




export default ReferenceCard