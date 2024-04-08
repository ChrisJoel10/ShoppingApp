import React, { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'

import { withRouter } from '../../common/with-router';
import AuthService from "../../services/auth.service";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      username: "",
      password: ""
    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }


  onSubmit(e) {
    AuthService.login(
      this.state.username,
      this.state.password
    ).then(
      response => {
        if(response.isSuccess == "true") {
          this.setState({
            message: "Login Successful",
            successful: true
          });
          // localStorage.setItem("user", response);
          this.props.router.navigate('/');
        }
        else {
          this.setState({
            message: response.message,
            successful: false
          });
        }

      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );

  }
  
  render() {
    return (
      <div>
        <Box component="section"
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="90vh"
        >
          <Box component="section"
            width="500px"
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            minHeight="70vh"
            py={10}
            borderRadius={5}
            sx={{ p: 2, border: '4px solid blue' }}>
            <h3>Login</h3>
            <TextField required fullWidth id="outlined-basic" label="Username" variant="outlined" margin="normal" onChange={this.onChangeUsername} error={this.state.isError} />
            <TextField required fullWidth id="outlined-basic" label="Password" variant="outlined" type="password" margin="normal" onChange={this.onChangePassword}/>
            <Button variant="contained" size="large" onClick={this.onSubmit}>Login</Button>
            <div>
              {this.state.message}
            </div>
          </Box>
        </Box>
      </div>
    );
  }
}

export default withRouter(Login);
