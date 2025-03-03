import { createSignal, onMount } from "solid-js";
import { useCrtlContext } from "../../../providers/CtrlProvider";
import { Operator, useOperatorContext } from "../../../providers/OperatorProvider";
import { useLogContext } from "../../../providers/LogProvider";

export default function useResult() {
    const { isCtrlPressed, setIsCtrlPressedToFalse, setIsCtrlPressedToTrue } = useCrtlContext()
    const { logValues, addLogValue, removeLastLogValue, clearLogValues } = useLogContext()
    const { operator, setOperator } = useOperatorContext()
    const [elements, setElements] = createSignal<Element[]>([]);
    const [result, setResult] = createSignal(0);

    const keysHandlers = {
        "Escape": () => {
            elements().forEach((element) => {
                element.setAttribute("isSelected", "false");
                element.removeAttribute("operator");
            });
            clearLogValues();
            setElements([]);
            setResult(0);
            setIsCtrlPressedToFalse()
        },
        "Control": () => {
            if (!isCtrlPressed()) setIsCtrlPressedToTrue()
            else setIsCtrlPressedToFalse()
        },
        "Backspace": () => {
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
        },
    }



    onMount(() => {
        document.addEventListener("keydown", (event) => {
            keysHandlers[event.key]?.()
            if (isCtrlPressed()) ({
                [Operator.ADD]: () => setOperator(Operator.ADD),
                [Operator.SUB]: () => setOperator(Operator.SUB),
                [Operator.MUL]: () => setOperator(Operator.MUL),
                [Operator.DIV]: () => setOperator(Operator.DIV),
            }[event.key])()
        }, { once: true });

        document.addEventListener("click", (event) => {
            if (!isCtrlPressed() && !operator()) return

            const element = (event.target as Element)
            const text = element?.innerHTML.replaceAll(/[A-Za-z.]+/gm, "").replace(',', '.');
            const value = parseInt(text, 10);
            if (isNaN(value)) return
            if (element.getAttribute("isSelected") === "true") return
            addLogValue(value);
            element.setAttribute("isSelected", "true");
            element.setAttribute("operator", operator())
            setElements([...elements(), element]);
            ({
                [Operator.ADD]: () => setResult(result() + value),
                [Operator.SUB]: () => setResult(result() - value),
                [Operator.MUL]: () => setResult(result() * value),
                [Operator.DIV]: () => setResult(result() / value),
            }[operator()])()
        }, { once: true });
    })

    return { result }
}