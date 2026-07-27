import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(0);

  const rates = {
    INR: 1,
    USD: 86.5,
    EUR: 100,
    CREDIT: 120
  };

  const convert = () => {
    let inRupees = amount * rates[from];
    let final = inRupees / rates[to];
    setResult(final);
  };

  return (

    <div className="min-h-screen bg-gray-600 text-white">
      <div className="bg-blue-500">
        <h1 className="text-5xl font-bold mb-8">
          Currency Exchange
        </h1>
      </div>

      <div className="text-black bg-gray-800 mt-5">
        <input
          className="text-black bg-green-500 px-6 py-3 m-2"
          type="number"
          value={amount}
          onChange={(e)=>setAmount(Number(e.target.value))}/>

        <select className="text-black bg-green-500 px-6 py-3 m-2"
          onChange={(e)=>setFrom(e.target.value)}>
          <option value="INR">Rupees</option>
          <option value="USD">Dollars</option>
          <option value="EUR">Euros</option>
          <option value="CREDIT">Republic Credits</option>
        </select>

        <h4 className="text-2 xl m-4 w-5">To</h4>

        <select
          className="text-black bg-blue-500 px-6 py-3 m-2"
          onChange={(e)=>setTo(e.target.value)}>
          <option value="INR">Rupees</option>
          <option value="USD">Dollars</option>
          <option value="EUR">Euros</option>
          <option value="CREDIT">Republic Credits</option>
        </select>

        <br/>

        <button className="bg-red-500 px-6 py-3 m-2" onClick={convert}        >
          Convert
        </button>


        <h1 className="text-4xl mt-8">
          Result : {result.toFixed(2)} {to}
        </h1>

        <div className="translate-x-[150px] mt-10">
          <div className="bg-black w-5 px-6 py-3"></div>
          <div className="bg-white w-5 px-6 py-3"></div>
          <div className="bg-red-500 w-5 px-6 py-3"></div>
        </div>
      </div>
    </div>
  );
}


export default App;