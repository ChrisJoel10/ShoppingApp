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

class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            message: "",
            name:"",
            desc:"",
            number: 0,
            nameVal: "",
            descVal: "",
            numberVal: ""
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangedesc = this.onChangedesc.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    
  onChangename(e) {
    var productname = e.target.value;
    let regex = "^[A-Za-z_ 0-9]{2,20}$";
    if(productname.match(regex)) {
      this.setState({
        name: e.target.value,
        nameVal: ""
      });
    }
    else {
      this.setState({
        nameVal: "Invalid Product name."
      })
    }

  }

  onChangedesc(e) {
    var description = e.target.value;
    let regex = "^[A-Za-z_ 0-9]{2,40}$";
    if(description.match(regex)) {
      this.setState({
        desc: e.target.value,
        descVal: ""
      });
    }
    else {
      this.setState({
        descValVal: "Invalid Product description."
      })
    }

  }

  onChangeNumber(e) {
    var value = e.target.value;
    if(value < 1)
    {
      this.setState({numberVal: "Enter value greater than 1"})
    }
    else
    {
      this.setState({
        number: e.target.value,
        numberVal: ""
      });
    }
  }
  
  onSubmit(e) {
    if(this.state.nameVal == "" && this.state.descVal == "" && this.state.numberVal == "")
    {
      userService.sendHTTP("post", "api/product/AddProduct", {name: this.state.name, description:this.state.desc, numberofavailable:this.state.number}).then((res) => { 
        this.setState({isError: res.isError, message: res.message})
          }
      );
    }
    else {
      this.setState({message: "Invalid form input"})
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
                        <h3>Add Product</h3>
                        <TextField required fullWidth id="outlined-basic" label="Product Name" variant="outlined" margin="normal" onChange={this.onChangename} error={this.state.isError} />
                        <TextField required fullWidth id="outlined-basic" label="Description" variant="outlined" margin="normal" onChange={this.onChangedesc} />
                        <TextField required fullWidth id="outlined-basic" label="Number of Products" variant="outlined" margin="normal" type="number" InputProps={{ inputProps: { min: 1, max: 100 } }} onChange={this.onChangeNumber} />
                        <Button variant="contained" size="large" onClick={this.onSubmit}>Add Product</Button>
                        <div>
                            {this.state.message}
                        </div>
                    </Box>
                </Box>
            </div>

        );
    }
}

export default withRouter(Sell);
