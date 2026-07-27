import { useState } from "react";
import "./App.css";


function App() {
  const [count, setCount] = useState(10);

  const increase = () => {
    setCount((prev) => prev + 1);
  };

  const decrease = () => {
    setCount((prev) => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-gray-600 text-white">
      <h1 className="text-5xl font-bold mb-8">Counter</h1>

      <h1 className="text-4xl mb-8">Count : {count}</h1>

      <div>
        <button className="bg-green-500 px-6 py-3 m-2"
          onClick={increase}
        >
          Increase
        </button>

        <button
          className="bg-red-500 px-6 py-3 m-2"
          onClick={decrease}
        >
          Decrease
        </button>

        <button
          className="bg-blue-500 px-6 py-3 m-2"
          onClick={reset}
        >
          Reset
        </button>
      <div className="translate-x-[150px]">
          <div className="bg-black w-5 px-6 py-3"></div>
          <div className="bg-white w-5 px-6 py-3"></div>
          <div className="bg-red-500 w-5 px-6 py-3"></div>
        </div>
      </div>
    </div>
  );
}

export default App;