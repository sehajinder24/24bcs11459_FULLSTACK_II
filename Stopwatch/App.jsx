import { useState, useEffect } from "react";
import "./App.css";


function App() {

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);


  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 0.01);
      }, 10);
    }
    return () => clearInterval(interval);
  },[running]);


  const start = () => {
    setRunning(true);
  };


  const stop = () => {
    setRunning(false);
  };


  const reset = () => {
    setRunning(false);
    setTime(0);
  };


  return (
    <div className="min-h-screen h-120 bg-gray-600 text-white">
      <div className="bg-orange-500">
      <h1 className="bg-orange-500 text-5xl font-bold mb-8">
        Stopwatch
      </h1>

      <h1 className="bg-orange-500 h-50 text-4xl mb-8">
        Time : {time.toFixed(2)} seconds
      </h1>
      </div>
      Commands :
      <div>
        <button
          className="bg-green-500 px-6 py-3 m-2"
          onClick={start}
        >
          Start
        </button>

        <button
          className="bg-red-500 px-6 py-3 m-2"
          onClick={stop}
        >
          Stop
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