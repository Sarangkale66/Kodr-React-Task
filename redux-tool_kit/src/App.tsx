import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment as incre, incrementAsync, incrementByAmount } from './features/CounterSlice'
import { type RootState, type AppDispatch } from './store/store'
import { useState } from 'react'

function App() {
  const [amount, setAmount] = useState<number>(0);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>count: {count}</h1>
      <div className="card">
        <button style={{ marginRight: "10px" }} onClick={() => dispatch(incre())}>
          Increment
        </button>
        <button onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <div className='card'>
          <input
            style={{ padding: "5px" }}
            type="number"
            name="value"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button style={{ marginRight: "10px" }} onClick={() => dispatch(incrementByAmount(amount))}>
          Increment by Amount
        </button>
        <button onClick={() => dispatch(incrementAsync(amount))}>
          Increment by Amount Asynchronously
        </button>
      </div>
      <p className="read-the-docs">
        Redux Tool-Kit
      </p>
    </>
  )
}

export default App
