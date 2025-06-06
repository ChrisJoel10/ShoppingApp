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

class FeedbackHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            message: "",
            name:"",
            desc:"",
            number: 0,
            data:[]
        }
    }

  componentDidMount(e) {
    userService.sendHTTP("get", "api/product/GetFeedbacks").then((res) => { 
            this.setState({isError: res.isError, data:res, message: res.message})
        }
    );

  }
  
    render() {


        return (
            <div>
                <h2 className="paddingClass">FeedBack History</h2>
                {this.state.data.map((feedback, i) => {
                        return (
                            <div className="feedback-card">
                                {feedback.description}
                            </div>
                        )
                    }
                )}
                
            </div>

        );
    }
}

export default withRouter(FeedbackHistory);
