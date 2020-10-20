import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class SignUp extends Component {

    state = {
        name: "",
            password: "",
            email: "",
            created: false
    }
    
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    };

    createUser = (event) => {
        event.preventDefault()
        event.target.reset()
        const { name, email, password } = this.state

        let user = {
            name: name,
            email: email,
            password: password
        }

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ user })
        })
            .then(r => r.json())
            .then(response => {
                // We are reciving a status of "created" if the user is valid and saved to the database
                if (response.status === "created") {
                    this.setState({ created: true })
                }
            })

    }




    render() { 
        return ( 
            <div id="signup">
                {this.state.created ? <Redirect to="/login" /> : <div>
                    <form onSubmit={this.createUser}>
                        <input type="text" name="email" placeholder="Email" onChange={this.handleChange} />
                        <input type="text" name="name" placeholder="Name" onChange={this.handleChange} />
                        <input type="text" name="password" placeholder="Password" onChange={this.handleChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>}
            </div>
         );
    }
}
 
export default SignUp;