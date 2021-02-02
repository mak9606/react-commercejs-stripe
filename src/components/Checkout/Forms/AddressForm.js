import React, { useEffect, useState } from 'react';
import { Grid,Button,Typography,Select,MenuItem,InputLabel, CircularProgress } from "@material-ui/core";
import { useForm,FormProvider } from "react-hook-form";
import CustomTextField from './CustomTextField';
import {commerce} from '../../../lib/commerce';
import { Link } from "react-router-dom";

const AddressForm = ({checkoutToken,next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods=useForm();
    const countries=Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}))
    const subdivisions=Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name}));
    
    const options=shippingOptions.map((sO)=>({id:sO.id,label:`${sO.description} - (${sO.price.formatted_with_symbol})`}))

    console.log(shippingOptions);

    const fetchShippingCountries= async (checkoutTokenId)=>{

        const {countries}=await commerce.services.localeListShippingCountries(checkoutTokenId);
        
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
      
    }

    const fetchSubdivisions=async (countryCode)=>{
        const {subdivisions}=await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions=async (checkoutTokenId,country,region)=>{
        const options=await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region});
       
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

 useEffect(() => {
   
    fetchShippingCountries(checkoutToken.id);
 }, []);

 useEffect(() => {
     if(shippingCountry) fetchSubdivisions(shippingCountry);
     }
 , [shippingCountry]);

 useEffect(()=>{
     if(shippingSubdivision) fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision);
 },[shippingSubdivision]);


    return (
       
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
            <Grid container spacing={3}>
             
                <CustomTextField  name="firstname" label="First name" />
                <CustomTextField  name="lastname" label="Last name" />
                <CustomTextField  name="address1" label="Address" />
                <CustomTextField  name="email" label="Email" />
                <CustomTextField  name="city" label="City" />
                <CustomTextField  name="zip" label="Zip / Postal Code" />
               
                <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Countries</InputLabel>
                <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                    {countries.map((country)=>  
                     <MenuItem key={country.id} value={country.id}>
                        {country.label}
                    </MenuItem>)}
 
                </Select>
                </Grid>

                 <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Subdivisions</InputLabel>
                <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                    {subdivisions.map((subdivision)=>
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                     {subdivision.label}
                     </MenuItem>
                     )}

                </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Options</InputLabel>
                <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
                   {options.map((option)=>
                    <MenuItem key={option.id} value={option.id}>
                    {option.label}
                </MenuItem>
                   )} 
                </Select>
                </Grid>  
                
            </Grid>
            <br />

            <div style={{display:"flex",justifyContent:"space-between"}}>
                    <Button component={Link} to="/cart" variant="outlined">Back</Button>
                    <Button variant="contained" color="primary" type="submit">Next</Button>
            </div>
            </form>
            </FormProvider>
        </>
    )
}

export default AddressForm;