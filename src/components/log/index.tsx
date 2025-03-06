import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { twMerge } from "tailwind-merge";
import { useLogContext } from "../../providers/LogProvider";

const container = twMerge([
    'fixed bottom-0.5 right-0.5', 
    'p-2', 
    'bg-zinc-200/95', 
    'border-2 border-zinc-400 rounded-lg', 
    'flex flex-col', 
    'w-[20%] z-[10000000]']);

export default function Log() {
    const { logValues } = useLogContext()
    const [isMinimized, setIsMinimized] = createSignal(false);

    createEffect(() => {
        window.addEventListener("message", (event) => {
            if (event.source !== window) return;
            if (event.data.action === "toggle_log") setIsMinimized(!isMinimized());
        });
    })

    return (
        <Show when={!isMinimized()}>
            <div class={container}>
                <p class="text-md text-black/80">Histórico</p>
                <div class="flex gap-2 p-0 overflow-x-scroll scrollbar-hide">
                    <For each={logValues().toReversed()}>
                        {(logValue) => (
                            <span class="flex justify-center items-center font-mono text-black/70">
                                {logValue}
                            </span>
                        )}
                    </For>
                </div>
            </div>
        </Show>
    )
}