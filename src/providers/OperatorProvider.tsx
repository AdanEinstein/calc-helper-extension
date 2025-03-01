import { Accessor, createContext, createSignal, ParentProps, Setter, useContext } from "solid-js";

export enum Operator {
    ADD = "+",
    SUB = "-",
    MUL = "*",
    DIV = "/",
}

interface IOperatorContext {
    operator: Accessor<Operator>
    setOperator: Setter<Operator>
}

const OperatorContext = createContext<IOperatorContext>()


export default function OperatorProvider(props: ParentProps) {
    const [operator, setOperator] = createSignal<Operator>();
    
    return (
        <OperatorContext.Provider value={{operator, setOperator}}>
            {props.children}
        </OperatorContext.Provider>
    )
}

export function useOperatorContext() {
    return useContext(OperatorContext)
}