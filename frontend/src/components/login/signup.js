import React, { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'

import { withRouter } from '../../common/with-router';
import AuthService from "../../services/auth.service";
import userService from "../../services/user.service";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      username: "",
      password: "",
      firstname:"",
      lastname:"", 
      confirmpassword:"",
      email:"",
      isValid: false,
      usernameVal: "",
      passwordVal: "",
      firstnameVal:"",
      lastnameVal:"", 
      confirmpasswordVal:"",
      emailVal:"",

    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChangeUsername(e) {
    var username = e.target.value;
    let regex = "^[A-Za-z][A-Za-z0-9_]{7,29}$";
    if(username.match(regex)) {
      this.setState({
        username: e.target.value,
        usernameVal: ""
      });
    }
    else {
      this.setState({
        usernameVal: "Invalid Username. Username should be alphanumeric and can contain _"
      })
    }
  }

  onChangeFirstName(e) {
    var firstname = e.target.value;
    let regex = "^[A-Za-z_ ]{2,10}$";
    if(firstname.match(regex)) {
      this.setState({
        firstname: e.target.value,
        firstnameVal: ""
      })
    }
    else {
      this.setState({
        firstnameVal: "Invalid Firstname format."
      })
    }

  }

  onChangeLastName(e) {
    var lastname = e.target.value;
    let regex = "^[A-Za-z_ ]{2,10}$";
    if(lastname.match(regex)) {
      this.setState({
        lastname: e.target.value,
        lastnameVal:""
      })
    }
    else {
      this.setState({
        lastnameVal: "Invalid Lastname format."
      })
    }

  }

  onChangeEmail(e) {
    var email = e.target.value;
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.match(regex)) {
      this.setState({
        email: e.target.value,
        emailVal: ""
     })
    }
    else {
      this.setState({
        emailVal: "Invalid Email. Use a proper format"
      })
    }


  }

  onChangePassword(e) {
    var password = e.target.value;
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(password.match(regex)) {
      this.setState({
        password: e.target.value,
        passwordVal: ""
      });
    }
    else {
      this.setState({
        passwordVal: "Weak password. It should be atleast 8 characters long with atleast one number and symbol"
      })
    }

  }

  onChangeConfirmPassword(e) {
    var confirmpassword = e.target.value;

    if(this.state.password == confirmpassword) {
      this.setState({
        confirmpassword: e.target.value,
        confirmpasswordVal: ""
    })
    }
    else {
      this.setState({
        confirmpasswordVal: "Password doesn't match"
      })
    }
  }

  onSubmit(e) {
    
    if(this.state.usernameVal == "" && this.state.firstnameVal == "" && this.state.lastnameVal == "" && this.state.emailVal == "" && this.state.passwordVal == "" && this.state.confirmpasswordVal == "" )
    {
      userService.sendHTTP("post", "api/users/registeruser", this.state).then(
        response => {
          if(response.isSuccess) {
              this.props.router.navigate('/login');
              this.setState({
                  message: "Signup Successful",
                  successful: true
              });
              // localStorage.setItem("user", response);
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
   
    else
    {
      this.setState({message: "Invalid data. Please check the errors"});
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
            <h3>SignUp</h3>
            <TextField required fullWidth id="outlined-basic" label="Username" variant="outlined" margin="normal" onChange={this.onChangeUsername} error={this.state.usernameVal != ""} helperText={this.state.usernameVal} />
            <TextField required fullWidth id="outlined-basic" label="FirstName" variant="outlined" margin="normal" onChange={this.onChangeFirstName} error={this.state.firstnameVal != ""} helperText={this.state.firstnameVal} />
            <TextField required fullWidth id="outlined-basic" label="LastName" variant="outlined" margin="normal" onChange={this.onChangeLastName} error={this.state.lastnameVal!= ""} helperText={this.state.lastnameVal}/>
            <TextField required fullWidth id="outlined-basic" label="Email" variant="outlined" margin="normal" onChange={this.onChangeEmail} error={this.state.emailVal != "" } helperText={this.state.emailVal}/>
            <TextField required fullWidth id="outlined-basic" label="Password" variant="outlined" type="password" margin="normal" onChange={this.onChangePassword} error={this.state.passwordVal != ""} helperText={this.state.passwordVal}/>
            <TextField required fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" type="password" margin="normal" onChange={this.onChangeConfirmPassword} error={this.state.confirmpasswordVal != ""} helperText={this.state.confirmpasswordVal}/>
            <Button variant="contained" size="large" onClick={this.onSubmit} >SignUp</Button>
            <div>
              {this.state.message}
            </div>
          </Box>
        </Box>
      </div>
    );
  }
}

export default withRouter(SignUp);
