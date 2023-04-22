import { createContext } from "react";

const CounterContext = createContext({
  counter: null,
  setCounter: () => {},
});

export default CounterContext;
