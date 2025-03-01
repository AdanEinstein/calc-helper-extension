import { createEffect, createSignal, Match, Switch } from "solid-js";
import Detail from "./components/detail";
import Result from "./components/result";
import { CrtlProvider } from "./providers/CtrlProvider";
import OperatorProvider from "./providers/OperatorProvider";
import Log from "./components/log";
import { LogProvider } from "./providers/LogProvider";

export default function App() {
  const [isActivated, setIsActivated] = createSignal(true);

  createEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.source !== window) return;
      if (event.data.action === "activate_extension") setIsActivated(true);
      if (event.data.action === "deactivate_extension") setIsActivated(false);
    });
  })

  return (
    <Switch>
      <Match when={isActivated()}>
        <CrtlProvider>
          <OperatorProvider>
            <LogProvider>
              <Result />
              <Detail />
              <Log />
            </LogProvider>
          </OperatorProvider>
        </CrtlProvider>
      </Match>
    </Switch>
  );
};