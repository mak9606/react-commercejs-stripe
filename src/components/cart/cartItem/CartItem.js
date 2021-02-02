import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './Styles';

const CartItem = ({cartItem,handleQty,handleRemove}) => {
    const classes=useStyles();
    return (
<Card>
    <CardMedia image={cartItem.media.source} alt={cartItem.name} className={classes.media}/>
    <CardContent className={classes.cardContent}>
        <Typography variant="h6">{cartItem.name}</Typography>
        <Typography variant="h5">{cartItem.line_total.formatted_with_symbol}</Typography>
    </CardContent>
    <CardActions className={classes.cartActions}>
        <div className={classes.buttons}> 
        <Button type="button" size="small" onClick={()=>handleQty(cartItem.id,cartItem.quantity-1)}>-</Button>
        <Typography>{cartItem.quantity}</Typography>
        <Button type="button" size="small" onClick={()=>handleQty(cartItem.id,cartItem.quantity+1)}>+</Button>
        </div>
     
        <Button  variant="contained" color="secondary" type="button" onClick={()=>handleRemove(cartItem.id)}>Remove</Button>

       
    </CardActions>
</Card>
    )
}

export default CartItem;
