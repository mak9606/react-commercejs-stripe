import React, { useEffect, useState } from 'react';
import { Paper,Stepper,Step,StepLabel,Typography,CircularProgress,CssBaseline,Divider,Button } from "@material-ui/core";
import useStyles from './styles';
import AddressForm from './Forms/AddressForm';
import PaymentForm from './Forms/PaymentForm';
import { commerce } from "../../lib/commerce";
import { Link } from 'react-router-dom';

const steps=["Shipping Address","Payment Details"];

const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    const [actSteps, setActSteps] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes=useStyles();
    
    useEffect(()=>
    {
        const generateToken=async ()=>{
            try {
                const token=await commerce.checkout.generateToken(cart.id,{type:'cart'});
                console.log(token);

                setCheckoutToken(token);
               
            } catch (error) {
                console.log(error);
            }
        }
        generateToken();

    },[cart]);

    const incSteps=()=>{
        setActSteps((step)=>step+1);
    }
    const decSteps=()=>{
        setActSteps((step)=>step-1);
    }
    
    const next=(data)=>{
        setShippingData(data);
        incSteps();
        console.log("working");
    }    
    const timeout=() =>{
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }
    if(error) {
        <>
        <CssBaseline />
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button variant="outlined" component={Link} to="/">Back to Home</Button>

            </>    }  


    return (
        <>
           <div className={classes.toolbar}/> 
           <main className={classes.layout}> 
               <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={actSteps} className={classes.stepper}>
                    {
                        steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
                {actSteps===steps.length?(isFinished?(<>
                <div>
                    <Typography variant="h5">Thank You for puchasing from us!</Typography>
                    <Divider  className={classes.divider}/>
                    <Button variant="outlined" component={Link} to="/">Back to Home</Button>
                </div>
                </>):<div className={classes.spinner}><CircularProgress /></div>) :
                (actSteps===0? checkoutToken && <AddressForm checkoutToken={checkoutToken} next={next} />:<PaymentForm onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} incSteps={incSteps} decSteps={decSteps} shippingData={shippingData} timeout={timeout}/>)}
               </Paper>
           </main>
        </>
    )
}

export default Checkout;
//in case of real commerce payment we will use order.customer at line 77 for condition