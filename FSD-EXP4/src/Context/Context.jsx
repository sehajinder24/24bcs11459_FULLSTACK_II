import { createContext, useContext, useState } from "react";

const exchangeRate = {
  RUP: { rate: 95.0, symbol: "₹" },
  USD: { rate: 1.0, symbol: "$" },
  EUR: { rate: 0.87, symbol: "€" },
  GBP: { rate: 0.74, symbol: "£" },
  JPY: { rate: 154.0, symbol: "¥" },
  RUB: { rate: 84.25, symbol: "₽" },
};

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");

  const changeCurrency = (currencyCode) => {
    setCurrency(currencyCode);
  };

  const formatPrice = (usdAmount) => {
    const currencyInfo = exchangeRate[currency];

    if (currencyInfo) {
      const convertedAmount = usdAmount * currencyInfo.rate;
      return `${currencyInfo.symbol}${convertedAmount.toFixed(2)}`;
    }

    return `${usdAmount.toFixed(2)} ${currency}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, changeCurrency, formatPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  return useContext(CurrencyContext);
};