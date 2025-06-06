import React, { Component } from "react";
import './home.css'
import { AppBar, Toolbar, Typography, IconButton, Button, Popover, List, ListItem, ListItemText } from '@mui/material';
import userService from "../../services/user.service";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { withRouter } from '../../common/with-router';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedToCart: [],
            count: 0,
            enableAdd: false,
            open: false
        }
        this.submit = this.submit.bind(this);
        this.setOpen = this.setOpen.bind(this);
    }

    submit() {

        var data = this.props.data.map((e) => { return { id: e.id, buycount: e.buycount } })
        userService.sendHTTP("post", "api/product/buyProducts", data).then((res) => {
            this.setState({ products: res })
            window.location.reload();
        }
        );
    }

    setOpen(value) {
        this.setState({open: value});
    }



    render() {
        return (
            <div className="cart-container">
                <Dialog
                    open={this.state.open}
                    onClose={() => this.setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Checkout Confirmation"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Click "Confirm" to proceed
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=> {this.setOpen(false)}}>Cancel</Button>
                        <Button onClick={this.submit} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

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
                    <Button className="buy-button" variant="contained" size="large" onClick={() => this.setOpen(true)} >Buy</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(Cart);
