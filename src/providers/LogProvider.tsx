/* @refresh reload */
import { Accessor, createContext, createSignal, ParentProps, useContext } from "solid-js";

const LogContext = createContext<LogContextType>();

export type LogContextType = {
  logValues: Accessor<number[]>
  addLogValue: (number) => void
  removeLastLogValue: () => void
  clearLogValues: () => void
}

export function useLogContext() {
  return useContext(LogContext);
}

export function LogProvider (props: ParentProps) {
  const [logValues, setLogValues] = createSignal([])
  const addLogValue = (value: number) => setLogValues([...logValues(), value])
  const removeLastLogValue = () => setLogValues(logValues().toSpliced(0, -1))
  const clearLogValues = () => setLogValues([])

  return (
    <LogContext.Provider value={{logValues, addLogValue, removeLastLogValue, clearLogValues}}>
      {props.children}
    </LogContext.Provider>
  );
}
