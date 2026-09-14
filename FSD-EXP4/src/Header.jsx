import { useCurrency } from "./Context/Context";

const StoreHeader = () => {
    const {currency,changeCurrency} = useCurrency();
    const currencies = ["RUP","USD","EUR","GBP","YEN","RUB"]

    return(
        <div>
            {currencies.map((CurrencyCode)=>{
                <button
                    key = {CurrencyCode}
                    onclick ={()=>changeCurrency(CurrencyCode)}
                    >
                {CurrencyCode}
                    </button>
            })}
        </div>
    );
};
export default StoreHeader;
