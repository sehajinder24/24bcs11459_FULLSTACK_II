import './App.css'
import { CurrencyProvider } from "./Context/Context";

import StoreHeader from "./Header";
import Product from "./Products";
import Checkout from "./Checkout";
import CurrencySelector from "./CurrencySelector"

function App() {
  return(
    <div>
      <h1>Global Store Checkout</h1>
      <CurrencyProvider>
        <StoreHeader/>
        <CurrencySelector/>
        <Product/>
        <Checkout/>
      </CurrencyProvider>
    </div>
  )
}
export default App;