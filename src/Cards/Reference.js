import React, { Component } from 'react';

const Reference = (props) => {
    return (

        <div>
                <div class="box">
                    <object data={props.references.url} width="800" height="800" type="text/html"> </object>
                </div>
            
        </div>
    )

}

export default Reference