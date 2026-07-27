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
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-8">Simple Counter</h1>

      <h2 className="text-4xl mb-8">Count : {count}</h2>

      <div>
        <button
          className="bg-green-500 px-6 py-3 rounded-lg m-2"
          onClick={increase}
        >
          Increase
        </button>

        <button
          className="bg-red-500 px-6 py-3 rounded-lg m-2"
          onClick={decrease}
        >
          Decrease
        </button>

        <button
          className="bg-blue-500 px-6 py-3 rounded-lg m-2"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;