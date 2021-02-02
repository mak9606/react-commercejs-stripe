import React from 'react';
import { Typography,Divider,Button } from "@material-ui/core";
import Review from '../Review';
import {  Elements,ElementsConsumer ,
CardElement} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";




const stripePromise=loadStripe('pk_test_grV6LcarYxcwVfWBOEudDRZa');


const PaymentForm = ({checkoutToken,incSteps,shippingData,decSteps,onCaptureCheckout,timeout}) => {

    const handleSubmit=async (e,elements,stripe)=>{
        e.preventDefault();

        if(!stripe || !elements) return;

        const cardElement=elements.getElement(CardElement);
       
        const {error,paymentMethod}= await stripe.createPaymentMethod({type:"card",card:cardElement})
        if(error){
            console.log(error);
        }
        else{
            const orderData={
                line_items:checkoutToken.live.line_items,
                customer:{firstname:shippingData.firstname,lastname:shippingData.lastname,email:shippingData.email},
                shipping:{
                    name:'Primary',
                    street:shippingData.address1,
                    town_city:shippingData.city,
                    county_state:shippingData.shippingSubdivision,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.shippingCountry
                },
                fulfillment:{shipping_method:shippingData.shippingOption},
                payment:{
                    gateway:'stripe',
                stripe:{
                    payment_method_id:paymentMethod.id
                }
            }
            }
            onCaptureCheckout(checkoutToken.id,orderData);
            timeout();
            incSteps();
        }
    }
    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
          
     
            <Typography variant="h6" gutterBottom style={{margin:'20px 0'}}>
                Payment method
            </Typography>

            <Elements stripe={stripePromise}>

                <ElementsConsumer>
                    {({elements,stripe})=>(
                           <form  onSubmit={(e)=>handleSubmit(e,elements,stripe)}>
                           <CardElement />
                           <br /><br />
                           <div style={{display:"flex",justifyContent:"space-between"}}>
                               <Button variant="outlined" onClick={decSteps} >Back</Button>
                               <Button type="submit"  variant="contained" color="primary">
                                   Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                               </Button>
                           </div>
                       </form>
                    )}
                </ElementsConsumer>

            </Elements>
          
          
          




           
        </>
    )
}

export default PaymentForm;
