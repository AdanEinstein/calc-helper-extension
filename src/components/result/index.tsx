import { twMerge } from "tailwind-merge";
import useResult from "./hooks/useResult";

const container = twMerge(['w-[20%]', 'absolute top-1 right-1', 'p-3', 'bg-zinc-200/95', 'border-2 border-zinc-400 rounded-lg', 'flex items-center gap-2', 'overflow-x-scroll scrollbar-hide']);

export default function Result() {
    const { result } = useResult();
    const valueComputed = (
        <span class="flex justify-center items-center font-mono text-black/70">
            {result()}
        </span>
    )

    return (
        <div id="calc-helper-result" class={container} style={{ "z-index": 1000, position: "fixed" }}>
            <span class="text-md text-black/80">Total:</span> {valueComputed}
        </div>
    );
}
