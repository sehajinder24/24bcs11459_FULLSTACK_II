import './App.css'
import { useEffect, useState } from 'react';

function App() {




  const [counter, setCounter] = useState(10);

  const [color,setColor] = useState('olive')

  const addElement = () => {
    console.log("Item added");
    setCounter(prev => prev + 1);
    setColor('white');
  }

  const removeElement = () => {
    console.log("Item removed");
    setCounter(prev => prev - 1);
  }
  
  const upd = () =>{
    console.log("reset");
    setCounter(0);
  }
  
  const [theme,setTheme] = useState('olive');
  
  const col = () =>{
    if(color=="White"){
      setTheme("Black");
    }
    else{
      setTheme("White");
    }
  }

  return (
    <>
    

    <div className="min-h-screen w-full text-white text-center" style={{ backgroundColor: color }}>

      <h1 className="text-5xl text-center bg-blue-500 w-full h-25">My Counter</h1>
      <h2 className="text-4xl">Count: {counter}</h2>  
      <h2>The page colour is : {theme}</h2>
      <button onClick = {col}>switch change:</button>
      <button className="text-3xl bg-green-500 w-48 h-20 m-2" onClick={addElement}>Increase</button>
      <button className="text-3xl bg-red-500 w-48 h-20 m-2" onClick={removeElement}>Decrease</button>      

      <h1 className="text-5xl bg-black-500 w-full h-24"></h1>

      <h1 className="text-5xl bg-yellow-500 w-full h-24">My StopWatch</h1>

      <h2 className="text-4xl">Time: {counter}</h2>  

      <button className="text-3xl bg-green-500 w-48 h-20 m-2" onClick={addElement}>Start</button>

      <button className="text-3xl bg-red-500 w-48 h-20 m-2" onClick={removeElement}>Stop</button>      

      <button className="text-3xl bg-orange-500 w-48 h-20 m-2" onClick={upd}>Destroy</button>      

      <div className="w-full min-h-screen bg-gray-800 flex flex-col items-center pt-8">
      <h1 className="text-5xl bg-black w-50 h-24 content"></h1>
      <h1 className="text-5xl bg-white w-50 h-24"></h1>
      <h1 className="text-5xl bg-red-500 w-50 h-24"></h1>
      </div>
    </div>

    </>
  )
}

export default App;