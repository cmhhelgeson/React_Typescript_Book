import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from "./store"
import { Provider } from 'react-redux';

//Not sure how this will affect performance
import { CanvasProvider } from './CanvasContext';


const rt = document.documentElement;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CanvasProvider>
        <App />
      </CanvasProvider>
    </Provider>
  </React.StrictMode>
);

