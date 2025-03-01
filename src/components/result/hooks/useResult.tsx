import { createEffect, createSignal } from "solid-js";
import { useCrtlContext } from "../../../providers/CtrlProvider";
import { Operator, useOperatorContext } from "../../../providers/OperatorProvider";
import { useLogContext } from "../../../providers/LogProvider";

export default function useResult() {
    const { isCtrlPressed, setIsCtrlPressedToFalse, setIsCtrlPressedToTrue } = useCrtlContext()
    const { logValues, addLogValue, removeLastLogValue, clearLogValues } = useLogContext()
    const { operator, setOperator } = useOperatorContext()
    const [elements, setElements] = createSignal<Element[]>([]);
    const [result, setResult] = createSignal(0);

    createEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                elements().forEach((element) => {
                    element.setAttribute("isSelected", "false");
                    element.removeAttribute("operator");
                });
                clearLogValues();
                setElements([]);
                setResult(0);
                setIsCtrlPressedToFalse()
            }
            if (event.key === "Control") {
                if (!isCtrlPressed()) setIsCtrlPressedToTrue()
                else setIsCtrlPressedToFalse()
            }
            if (event.key === "Backspace") {
                const element = elements().pop();
                const operator = element?.getAttribute("operator");
                const lastValue = logValues().pop();
                if (element) {
                    element.setAttribute("isSelected", "false");
                    element.removeAttribute("operator");
                    removeLastLogValue();
                    setElements(elements().toSpliced(0, -1));
                    setResult({
                        [Operator.ADD]: () => result() - lastValue,
                        [Operator.SUB]: () => result() + lastValue,
                        [Operator.MUL]: () => result() / lastValue,
                        [Operator.DIV]: () => result() * lastValue,
                    }[operator]())
                }
            }
            if (isCtrlPressed()) {
                switch (event.key) {
                    case Operator.ADD:
                        setOperator(Operator.ADD);
                        break;
                    case Operator.SUB:
                        setOperator(Operator.SUB);
                        break;
                    case Operator.MUL:
                        setOperator(Operator.MUL);
                        break;
                    case Operator.DIV:
                        setOperator(Operator.DIV);
                        break;
                    default:
                        break;
                }
            }
        });

        document.addEventListener("click", (event) => {
            if (isCtrlPressed() && operator()) {
                const element = (event.target as Element)
                const value = parseInt(element?.innerHTML, 10);
                if (isNaN(value)) return
                if (element.getAttribute("isSelected") === "true") return
                
                addLogValue(value);
                element.setAttribute("isSelected", "true");
                element.setAttribute("operator", operator())
                setElements([...elements(), element]);

                switch (operator()) {
                    case Operator.ADD:
                        setResult(result() + value);
                        break;
                    case Operator.SUB:
                        setResult(result() - value);
                        break;
                    case Operator.MUL:
                        setResult(result() * value);
                        break;
                    case Operator.DIV:
                        setResult(result() / value);
                        break;
                }
            }
        });
    })

    return { result }
}