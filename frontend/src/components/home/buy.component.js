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
import Card from "./card";

class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            products: [],
            cartList: []
        }
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);

    }


    componentDidMount() {
        userService.sendHTTP("get", "api/product/getProducts").then((res) => 
            {
                this.setState({products: res})
            } 
        );
    }

    addToCart(product) {

        var list1 = this.state.cartList;
        list1.push(product);
        this.setState({cartList: list1});
        this.props.getCartCallback(list1);
    }

    removeFromCart(product) {
        var list1 = this.state.cartList;
        var index = list1.findIndex(e => e.id == product.id);
        if(index > -1) {
            list1.splice(index, 1);
        }
        this.setState({cartList: list1});
        this.props.getCartCallback(list1);
    }

    render() {


        return (
            <div className="product-grid" >
                {this.state.products.map((product, i) => {
                        return (
                            <Card data={product} addCallback = {this.addToCart} removeCallback = {this.removeFromCart}/>
                        )
                    }
                )}
                
            </div>

        );
    }
}

export default withRouter(Buy);
