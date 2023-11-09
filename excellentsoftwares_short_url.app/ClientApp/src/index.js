import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Links_data_provider from './AppContext/short_linksContext';
import { Provider } from 'react-redux';
import store from './redux/store'



const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
ReactDOM.render(
        <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
        <Links_data_provider>
            <App />
            </Links_data_provider>
  </BrowserRouter>,
        </Provider>,
  rootElement);

registerServiceWorker();

