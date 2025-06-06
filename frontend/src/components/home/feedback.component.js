import React, { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './home.css'

import { withRouter } from '../../common/with-router';
import AuthService from "../../services/auth.service";
import { AppBar, Toolbar, Typography, IconButton, Button, Popover, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChangePwdComponent from './../login/changePwd.component';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import userService from "../../services/user.service";
import { ThirtyFpsSelect } from "@mui/icons-material";
import Textarea from '@mui/joy/Textarea';


class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            message: "",
            name:"",
            description:"",
            number: 0
        }
        this.onChangedesc = this.onChangedesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }




  onChangedesc(e) {
    var desc = e.target.value;
    var regex = /^[^<>&]+$/;
    if(desc.match(regex)) {
        this.setState({
            description: e.target.value,
            message: ""
          });
    }
    else {
      this.setState({
        message: "Contains Invalid format text"
      })
    }

  }


  
  onSubmit(e) {
    if(this.state.message == "")
    {
        userService.sendHTTP("post", "api/product/AddFeedback", this.state).then((res) => { 
            this.setState({isError: res.isError, message: res.message})
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
                        <h3>Add Feedback</h3>
                        <Textarea name="Outlined" fullWidth required placeholder="Type in here…" variant="outlined" onChange={this.onChangedesc} margin="normal" />
                        <Button variant="contained" size="large" onClick={this.onSubmit}>Add Feedback</Button>
                        <div>
                            {this.state.message}
                        </div>
                    </Box>
                </Box>
            </div>

        );
    }
}

export default withRouter(Feedback);
