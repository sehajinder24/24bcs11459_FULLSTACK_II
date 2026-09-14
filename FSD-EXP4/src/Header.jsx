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
                                style={{
              fontWeight: currency === CurrencyCode ? "bold" : "normal",
              backgroundColor:
                currency === CurrencyCode ? "#007bff" : "#eee",
              color: currency === CurrencyCode ? "white" : "black",
              margin: "5px",
              padding: "8px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}

                >
                {CurrencyCode}
                    </button>
            })}
        </div>
    );
};
export default StoreHeader;