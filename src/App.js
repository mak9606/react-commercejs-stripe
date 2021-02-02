import logo from './logo.svg';
import './App.css';
import Products from './components/products/Products';
import Navbar from './components/navbar/Navbar';
import { commerce } from "./lib/commerce";
import { useEffect, useState } from 'react';
import Cart from './components/cart/Cart';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Checkout from './components/Checkout/Checkout';
import { ErrorSharp } from '@material-ui/icons';


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const fetchProducts= async ()=>{
    const {data}=await commerce.products.list();
    setProducts(data);
  }
  const fetchCart=async ()=>{
    setCart(await commerce.cart.retrieve());
  }
 

  const handleAddToCart=async (productId,quantity)=>{
    const {cart}=await commerce.cart.add(productId,quantity);
    setCart(cart);
  }

  const handleQuantity=async (productId,quantity)=>{
const qty=await commerce.cart.update(productId,{quantity});
setCart(qty.cart);
  }
const handleRemoveFromCart=async (productId)=>{
const {cart}=await commerce.cart.remove(productId);
setCart(cart);
}
const handleEmptyCart=async ()=>{
  const empty=await commerce.cart.empty();
  setCart(empty.cart);
}
const refreshCart=async ()=>{
  const {cart}=await commerce.cart.refresh();
  setCart(cart);
}

const handleCaptureCheckout=async (checkoutTokenId,newOrder)=>{
try {
  const incomingOrder=await commerce.checkout.capture(checkoutTokenId,newOrder);
  setOrder(incomingOrder);
  refreshCart();
} catch (error) {
  setErrorMessage(error.data.error.message);
}
}
  useEffect(() => {
    
    fetchProducts();
    fetchCart();
    
  }
  , []);
 
  return (
    <BrowserRouter>
    <div>
      <Navbar totalItems={cart.total_items}/>
      <Switch>
        <Route exact path='/'>
        <Products products={products} addToCart={handleAddToCart}/>
        </Route>
        <Route exact path='/cart'>
        <Cart cart={cart}
          products={products}
          handleQuantity={handleQuantity}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
          />
        </Route>
        <Route exact path="/checkout">
        <Checkout cart={cart} 
        order={order}
        onCaptureCheckout={handleCaptureCheckout}
        error={errorMessage}
        />
        </Route>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
