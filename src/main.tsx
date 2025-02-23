import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';
import './normalize.css';
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/Store.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
