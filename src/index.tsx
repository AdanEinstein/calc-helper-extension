/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

import App from './App';

let root = document.getElementById('calc-helper-root');
if (!root) root = document.querySelector('body');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <App />, root!);