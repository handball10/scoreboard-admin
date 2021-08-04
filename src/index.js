import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma';
import './scss/bulma-dark.css';
import './scss/react-tabs.scss';
import './index.scss';
import WebsocketApi from './lib/websocket';
import App from './App.jsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import CommandHandler from './lib/commandLine';
import * as serviceWorker from './serviceWorker';
import Modal from 'react-modal';
import { ToastProvider } from 'react-toast-notifications';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {
  initHeartbeat
} from './lib/heartbeat';

const rootElement = document.getElementById('root');
Modal.setAppElement(rootElement);


initHeartbeat();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
