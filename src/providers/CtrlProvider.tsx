/* @refresh reload */
import { Accessor, createContext, createSignal, ParentProps, useContext } from "solid-js";

const CrtlContext = createContext<CrtlContextType>();

export type CrtlContextType = {
  isCtrlPressed: Accessor<boolean>
  setIsCtrlPressedToFalse: () => false
  setIsCtrlPressedToTrue: () => true
}

export function useCrtlContext() {
  const context = useContext(CrtlContext);
  if (!context) {
    throw new Error("useCrtlContext must be used within a CrtlProvider");
  }
  return context;
}

export function CrtlProvider (props: ParentProps) {
  const [isCtrlPressed, setIsCtrlPressed] = createSignal(false)
  const setIsCtrlPressedToFalse = () => setIsCtrlPressed(false);
  const setIsCtrlPressedToTrue = () => setIsCtrlPressed(true);
  return (
    <CrtlContext.Provider value={{isCtrlPressed, setIsCtrlPressedToFalse, setIsCtrlPressedToTrue}}>
      {props.children}
    </CrtlContext.Provider>
  );
}
