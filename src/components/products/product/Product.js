import React from 'react';
import { Card,CardMedia,CardActions,CardContent,Typography,IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";


const Product = ({product,addToCart}) => {
    const classes=useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia  className={classes.media} image={product.media.source} title="product.name" />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5"> 
                    {product.name}
                    </Typography>
                    <Typography variant="h5">
                    {product.price.formatted_with_symbol}
                    </Typography>

                </div>
                <Typography dangerouslySetInnerHTML={{__html:product.description}} color="textSecondary" variant="body1" />
            </CardContent >
            <CardActions   className={classes.cardActions}>
                <IconButton aria-label="Add To Cart" onClick={()=>addToCart(product.id,1)}> 
                <AddShoppingCart  />
                </IconButton>
            </CardActions>
        </Card> 
    )
}

export default Product;
