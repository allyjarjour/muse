import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from "./store";
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
