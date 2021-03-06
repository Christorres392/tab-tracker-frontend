import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Grid, Button, Header as LoginHeader, Segment } from 'semantic-ui-react'
import Header from '../components/Header';



class Login extends Component {


    state = {
        name: "",
        password: "",
        loggedIn: false,
        currentUser: ""
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    };

    login = (event) => {
        event.preventDefault()
        event.target.reset()

        const { name, password } = this.state

        const user = { name, password }

        fetch("https://tab-tracker392.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user })
        })
            .then(r => r.json())
            .then(response => {
                localStorage.setItem("token", response.jwt)
                localStorage.setItem("user", JSON.stringify(response.user))
                //    console.log(response)
                this.props.handleLogin(response)
                this.props.history.push("/")
                this.setState({ currentUser: response.user, loggedIn: true })

            })

    }




    render() {
        return (
            <div id="login" className="login" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/desktop_2.jpeg'})` }}>
                
                <div className="login-form-container">
                    <Grid centered className="login-form">
                        <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
                            <LoginHeader>Login</LoginHeader>
                            <Segment>
                                <Form onSubmit={this.login} >
                                    <input type="text" name="name" placeholder="Name" onChange={this.handleChange} />
                                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                                    <Button fluid type="submit" >Submit</Button>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
                    <h1 className="greeting">Welcome To Tab-Tracker</h1>
            </div>
        );
    }
}

export default Login;