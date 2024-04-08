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
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';



class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedToCart: false,
            count: 0,
            enableAdd: false
        }
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.setCount = this.setCount.bind(this);

    }

    add(e) {
        this.setState({addedToCart: true});
        this.props.data.buycount = this.state.count;
        this.props.addCallback(this.props.data);
    }

    remove(e) {
        this.setState({addedToCart: false});
        this.props.removeCallback(this.props.data);
    }

    setCount(number) {
        this.setState({count:number});
        if(number > 0) {
            this.setState({enableAdd: true})
        }
        else if(number < 1) {
            this.setState({enableAdd: false})
        }
    }

    render() {
        return (
            <div className="card">
                <div className="image-container">
                    <img className="product-image" src="https://static.thenounproject.com/png/908418-200.png"></img> <br />
                </div>
                <div>
                    <b> {this.props.data.name} </b><br />
                    <span style={{color: 'grey'}}>{this.props.data.description} </span> <br />
                </div>
                {/* Sold by: {this.props.data.sellerUserEmail} <br /> */}
                Sold by: {this.props.data.sellerFirstName + " " + this.props.data.sellerLastName} <br />
                Availability: {this.props.data.numberofavailable - this.state.count} Items <br />

                <ButtonGroup>
                    <Button
                        aria-label="reduce"
                        onClick={() => {
                        this.setCount(Math.max(this.state.count - 1, 0));
                        }}
                    >
                        <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                        aria-label="reduce"
                    >
                        {this.state.count}
                    </Button>
                    <Button
                        aria-label="increase"
                        onClick={() => {
                        this.setCount(Math.min(this.props.data.numberofavailable, this.state.count + 1));
                        }}
                    >
                        <AddIcon fontSize="small" />
                    </Button>
                </ButtonGroup>

                {!this.state.addedToCart?(
                        <Button variant="contained" size="small" onClick={this.add} disabled={!this.state.enableAdd}>Add to cart</Button>
                    ):(
                        <Button variant="contained" size="small" onClick={this.remove}>Remove from Cart</Button>
                    )
                }
            </div>
        );
    }
}

export default withRouter(Card);
