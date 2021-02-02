import { Button, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './cartItem/CartItem';
import useStyles from './style';

const Cart = ({cart,products,handleQuantity,handleRemoveFromCart,handleEmptyCart}) => {
    const classes=useStyles();
    console.log(cart);
   
    return (
        !products.length?<CircularProgress color="secondary"/>:
       ( <Container >
            <div className={classes.toolbar} />
            <Typography className={classes.title} gutterBottom variant="h3">Shopping Cart</Typography>
            {!cart.line_items.length?(<Typography variant="subtitle2">The Cart is empty
            <Link to='/' className={classes.link}> Add something</Link></Typography>):(
               <Grid container spacing={3}>
                   {
                       cart.line_items.map((items)=>(
                           <Grid item xs={12} sm={4} key={items.id}>
                            <CartItem cartItem={items} handleQty={handleQuantity} handleRemove={handleRemoveFromCart}/>   
                           </Grid>
                       ))
                   }
                   <div className={classes.cardDetails}>
                       <Typography variant="h4">Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
                       <div>
                           <Button className={classes.emptyButton} size="large" color="secondary" type="button" variant="contained" onClick={handleEmptyCart}>Empty Cart</Button>
                           <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" color="primary" type="button" variant="contained">CheckOut</Button>

                       </div>
                   </div>
               </Grid>
            )}
        </Container>
        
        )
      
    )
}

export default Cart;

//in material ui we can add Link as a component as well