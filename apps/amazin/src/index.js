import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

import { ShadowProvider } from './utils/useShadow';

ReactDOM.render(
  <Provider store={store}>
    <ShadowProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ShadowProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
