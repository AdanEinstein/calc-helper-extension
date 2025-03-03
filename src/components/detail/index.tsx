import { createSignal, Match, onMount, Show, Switch } from "solid-js";
import { twMerge } from "tailwind-merge";
import { useCrtlContext } from "../../providers/CtrlProvider";
import { Operator, useOperatorContext } from "../../providers/OperatorProvider";

const container = twMerge(['absolute bottom-0.5 left-0.5', 'p-2', 'bg-zinc-200/95', 'border-2 border-zinc-400 rounded-lg', 'flex flex-col']);

export default function Detail() {
    const [isMinimized, setIsMinimized] = createSignal(false);

    const { isCtrlPressed } = useCrtlContext()
    const { operator } = useOperatorContext()

    onMount(() => {
        window.addEventListener("message", (event) => {
            if (event.source !== window) return;
            if (event.data.action === "minimize_details") setIsMinimized(!isMinimized());
        }, { once: true });
    })

    return (
        <div id="calc-helper-detail" class={container} style={{ "z-index": 1000, position: "fixed" }}>
            <ul class="flex flex-col gap-2 p-0">
                <li class="flex items-center gap-2">
                    <span
                        class="text-md px-1 py-0.5 bg-amber-50 border border-zinc-500 rounded-lg font-mono text-black/70 data-[isPressed=true]:bg-emerald-500 data-[isPressed=true]:border-1 data-[isPressed=true]:border-emerald-900"
                        data-isPressed={isCtrlPressed()}>
                        Crtl
                    </span>
                    <span class="text-md text-black/80">para selecionar os números</span>
                </li>
                <li class="flex items-center gap-2">
                    <Switch fallback={<span class="text-md px-1 border border-zinc-500 py-0.5 bg-amber-50 rounded-lg font-mono text-black/70">N/A</span>}>
                        <Match when={operator() === Operator.ADD}>
                            <span class="text-md px-1 border border-zinc-500 w-10 flex justify-center items-center py-0.5 bg-emerald-500 rounded-lg font-bold font-mono text-black/70">{operator()}</span>
                        </Match>
                        <Match when={operator() === Operator.SUB}>
                            <span class="text-md px-1 border border-zinc-500 w-10 flex justify-center items-center py-0.5 bg-blue-500 rounded-lg font-bold font-mono text-black/70">{operator()}</span>
                        </Match>
                        <Match when={operator() === Operator.MUL}>
                            <span class="text-md px-1 border border-zinc-500 w-10 flex justify-center items-center py-0.5 bg-amber-500 rounded-lg font-bold font-mono text-black/70">x</span>
                        </Match>
                        <Match when={operator() === Operator.DIV}>
                            <span class="text-md px-1 border border-zinc-500 w-10 flex justify-center items-center py-0.5 bg-fuchsia-900 rounded-lg font-bold font-mono text-white/70">÷</span>
                        </Match>
                    </Switch>
                    <span class="text-md text-black/80">operador selecionado (+,-,*,/)</span>
                </li>
                <Show when={!isMinimized()}>
                    <li class="flex items-center gap-2">
                        <span class="text-md px-1 border border-zinc-500 py-0.5 bg-amber-50 rounded-lg font-mono text-black/70">Esc</span>
                        <span class="text-md text-black/80">para restaurar os valores</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="text-md px-1 border border-zinc-500 py-0.5 bg-amber-50 rounded-lg font-mono text-black/70">Crtl+Shift+Y</span>
                        <span class="text-md text-black/80">para ativar a extensão</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="text-md px-1 border border-zinc-500 py-0.5 bg-amber-50 rounded-lg font-mono text-black/70">Crtl+Shift+U</span>
                        <span class="text-md text-black/80">para desativar a extensão</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="text-md px-1 border border-zinc-500 py-0.5 bg-amber-50 rounded-lg font-mono text-black/70">Crtl+Shift+L</span>
                        <span class="text-md text-black/80">para minimizar/maximizar o histórico</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="text-md px-1 border border-zinc-500 py-0.5 bg-amber-50 rounded-lg font-mono text-black/70">Crtl+Shift+Z</span>
                        <span class="text-md text-black/80">para minimizar/maximizar a ajuda</span>
                    </li>
                </Show>
            </ul>
            <Show when={!isMinimized()}>
                <p class="flex gap-2 items-center">
                    <span class="text-md text-black/80">Desenvolvido por</span>
                    <a href="http://www.linkedin.com/in/adaneinstein" target="_blank" rel="noopener noreferrer">
                        <span class="text-md font-mono text-blue-800 underline">AdanEinstein</span>
                    </a>
                </p>
            </Show>
        </div>
    );
}
