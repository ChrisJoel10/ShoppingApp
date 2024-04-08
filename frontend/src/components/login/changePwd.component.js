import React, { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'

import { withRouter } from '../../common/with-router';
import userService from "../../services/user.service";


class ChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      password1: "",
      password2: "",
      message:""
    }

    this.onChangePassword1 = this.onChangePassword1.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }


  onChangePassword1(e) {
    this.setState({
      password1: e.target.value
    });
  }

  onChangePassword2(e) {
    this.setState({
      password2: e.target.value
    });
  }

  onSubmit(e) {
    if(this.state.password1 !== this.state.password2) {
        this.setState({
            message: "Passwords do not match",
            error: true
          });
    }
    else{
        userService.sendHTTP("post", "api/users/changePwd", {password: this.state.password1}).then(
        response => {
          if(response.isSuccess == "true") {
            this.setState({
              message: "Password Changed",
              successful: true
            });
          }
          else {
            this.setState({
              message: response.message,
              successful: false
            });
          }
        }
      );
    }
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
            <h3>Change Password</h3>
            <TextField required fullWidth id="outlined-basic" label="Password" variant="outlined" type="password" margin="normal" onChange={this.onChangePassword1} error={this.state.isError} />
            <TextField required fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" type="password" margin="normal" onChange={this.onChangePassword2} error={this.state.isError} />
            <Button variant="contained" size="large" onClick={this.onSubmit}>Submit</Button>
            <div>
              {this.state.message}
            </div>
          </Box>
        </Box>
      </div>
    );
  }
}

export default withRouter(ChangePwd);
