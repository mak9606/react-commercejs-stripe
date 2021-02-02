import React from 'react';
import {CircularProgress, Grid} from '@material-ui/core';
import useStyles from "./styles";
import Product from './product/Product';


const Products = ({products,addToCart}) => {
    const classes=useStyles();
    
    return (
        !products.length ?<CircularProgress />:
        <main className={classes.content}>
            <div className={classes.toolbar} />
          <Grid container justify="center" spacing={4}>
             { products.map((product)=>(
                     <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} addToCart={addToCart}/>
                     </Grid>
             ))}
          

          </Grid>  
        </main>
             
    )
}

export default Products;
