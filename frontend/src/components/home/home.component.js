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
import BuyComponent from "./buy.component";
import SellComponent from "./sell.component";
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/joy/Drawer';
import Cart from './cart';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      currentPage: "home",
      showCart: false,
      count: 0,
      addedToCart: []
    }
    this.handleUserIconClick = this.handleUserIconClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.navigatePage = this.navigatePage.bind(this);
    this.logout = this.logout.bind(this);
    this.getCart = this.getCart.bind(this);
    this.showCart = this.showCart.bind(this);
  }

  showCart(isOpen) {
    this.setState({showCart: isOpen});
  }

  logout() {
    localStorage.removeItem("user");
    this.props.router.navigate('/login');
  }

  navigatePage(e) {
    this.setState({
      currentPage: e
    })
  }

  handleUserIconClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  getCart(cart) {
    this.setState({count:cart.length, addedToCart: cart});
  }


  renderContent() {
    switch (this.state.currentPage) {
      case "home":
        return <BuyComponent  getCartCallback={this.getCart}/>
      case "changePwd":
        return <ChangePwdComponent/>
      case "buy":
        return <BuyComponent />
      case "sell":
        return <SellComponent />
    
      default:
        break;
    }
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? 'user-menu-popover' : "";

    return (
      <div>
      <Drawer key="right" anchor="right" open={this.state.showCart} onClose={() => this.showCart(false)}>
        <Cart data = {this.state.addedToCart} />
      </Drawer>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => {this.navigatePage("home")}}>
            Home
          </Typography>
          <IconButton color="inherit" onClick={() => this.showCart(true)}>
            <Badge color="secondary" badgeContent={this.state.count}>
              <MailIcon />
            </Badge>
          </IconButton>
          <Button color="inherit" component={Link} onClick={() => {this.navigatePage("buy")}}>
            Buy
          </Button>
          <Button color="inherit" component={Link} onClick={() => {this.navigatePage("sell")}}>
            Sell
          </Button>

          <IconButton
            color="inherit"
            aria-label="user-menu"
            onClick={this.handleUserIconClick}
          >
            <AccountCircleIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <List>
              <ListItem button>
                <ListItemText primary="Change Password" onClick={() => {this.navigatePage('changePwd')}} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Logout" onClick={this.logout} />
              </ListItem>

            </List>
          </Popover>
        </Toolbar>
      </AppBar>
              {this.renderContent()}
      </div>

    );
  }
}

export default withRouter(Home);
