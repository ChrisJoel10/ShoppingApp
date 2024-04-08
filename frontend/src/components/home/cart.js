import React, { Component } from "react";
import './home.css'
import { AppBar, Toolbar, Typography, IconButton, Button, Popover, List, ListItem, ListItemText } from '@mui/material';
import userService from "../../services/user.service";

import { withRouter } from '../../common/with-router';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedToCart: [],
            count: 0,
            enableAdd: false
        }
        this.submit = this.submit.bind(this);
    }

    submit() {

        var data = this.props.data.map((e) => { return {id: e.id, buycount: e.buycount}})
        userService.sendHTTP("post", "api/product/buyProducts", data).then((res) => 
        {
            this.setState({products: res})
        } 
        );
    }

    render() {
        return (
           <div className="cart-container">
                <h2>Cart</h2>
                <div >
                    {this.props.data.map((product, i) => {
                        return (
                            <div className="Cart">
                                <div>
                                    <b> {product.name} </b><br />
                                    <span style={{ color: 'grey' }}>{product.description} </span> <br />
                                </div>
                                Sold by: {product.sellerFirstName + " " + product.sellerLastName} <br />
                                No Of Items: {product.buycount} < br />
                            </div>
                        )
                    }
                )}
                </div>
                <div >
                    <Button className="buy-button" variant="contained" size="large" onClick={this.submit} >Buy</Button>
                </div>
            </div> 
        );
    }
}

export default withRouter(Cart);
