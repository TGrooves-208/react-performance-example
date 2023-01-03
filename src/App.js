import { useState, useMemo, useCallback, lazy, Suspense } from "react";
// import MyButton from './components/MyButton';
import "./App.css";

// This will only run when we have the MyButton variable that we need conditionally
const MyButton = lazy(() => import("./components/MyButton"));

export default function App() {
  // We want to make our renders more effecient (less time for renders)
  // We want to minimize the amount of renders
  const [num, setNum] = useState(10);
  const [logValue, setLogValue] = useState("");
  // 1. Example one adding a new const for our useMemo hook (it takes in a function)
  // 1. It is going to make the return value of useMemo only called when dependency array has changed
  // 1. If something has changed it will trigger, if not then it will use the previous render value
  // 1. Add the logValue to the dependency array to see the change in the console when typing
  const fibValue = useMemo(() => {
    console.log("Calculating the fib value");
    return fib(num);
    // 1. We can add the logValue to the dependency array below to capture the console change
  }, [num]);

  // 1. We can use useMemo here on the onClick to address performance
  // const onClickLog = useMemo(() => {
  //   return () => {
  //     console.log(logValue);
  //   };
  // }, [logValue]);

  // 1. Shorthand for using a callback on the function we are memoizing being passed
  const onClickLog = useCallback(() => {
    console.log(logValue);
  }, [logValue]);

  return (
    // 1. Example beginning
    // 1. We will need memoization to calculate the function
    // 1. We want to basically set when we want to calculate accordingly
    // 1. We will use another hook for this (useMemo) and then add a new const
    <div className="App">
      {/* 1. This changes to fibValue
     <h1>Fib {num} is {fib(num)}</h1> */}
      <h1>
        Fib {num} is {fibValue}
      </h1>
      <input
        type="number"
        value={num}
        onChange={(event) => setNum(parseInt(event.target.value))}
      />

      <input
        type="text"
        value={logValue}
        onChange={(event) => setLogValue(event.target.value)}
      />
      {/* We can use a new function up top to make this more performant
          on the initial render there will be no button
          We are only rendering the button when we absolutely need too now */}
      {/* <MyButton onClick={() => {
      console.log(logValue)}}>Log Value</MyButton> */}

      {/* We can now conditionally render the button when we need it */}
      {logValue.length > 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <MyButton onClick={onClickLog}>Log Value</MyButton>
        </Suspense>
      ) : null}
    </div>
    // 1. End Example 1
  );
}

function fib(n) {
  if (n === 2) return 1;
  if (n === 1) return 0;
  return fib(n - 1) + fib(n - 2);
}
