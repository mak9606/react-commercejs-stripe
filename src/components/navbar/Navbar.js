import React from 'react';
import { AppBar,IconButton,Toolbar,Badge, MenuItem,Menu,Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../images/icon.png";
import useStyles from "./styles";
import { Link,useLocation } from 'react-router-dom';
const Navbar = ({totalItems}) => {
    const classes=useStyles();
    const location=useLocation();
    return (
        <>
        <AppBar className={classes.appBar} color="inherit">
        <Toolbar>
            <Link to="/" style={{textDecoration:"none",color:"black"}}>
            <Typography variant="h6" color="inherit" className={classes.title}>
            <img src={logo} alt="E-commerce" height="25px" className={classes.image}/>
            E-Commerce 
            </Typography>
            </Link>
            <div className={classes.grow} />
            {location.pathname==='/' &&
            (<div className={classes.button}>
           <Link to="/cart"> <IconButton>
                <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
                </Badge>
                </IconButton>
                </Link>
            </div>)
            }
        </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar;

//just used double AND(&&) instead of ternary(?) as it means the same