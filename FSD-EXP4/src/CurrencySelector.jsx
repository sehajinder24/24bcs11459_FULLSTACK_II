import { useCurrency } from "./Context/Context";

const CurrencySelector = () => {
  const { currency, changeCurrency } = useCurrency();

  return (
    <div>
      <button onClick={() => changeCurrency("INR")}>
        Rupees ₹
      </button>

      <button onClick={() => changeCurrency("USD")}>
        Dollar $
      </button>

      <button onClick={() => changeCurrency("EUR")}>
        Euro €
      </button>

      <button onClick={() => changeCurrency("GBP")}>
        Pound £
      </button>

      <button onClick={() => changeCurrency("JPY")}>
        Yen ¥
      </button>

      <button onClick={() => changeCurrency("RUB")}>
        Ruble ₽
      </button>

      <p>Selected currency: {currency}</p>
    </div>
  );
};

export default CurrencySelector;
