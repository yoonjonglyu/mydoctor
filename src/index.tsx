import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Store from './store/configureStore';

import App from './app';

const render = (App: React.FC) => {
    ReactDOM.render(
        <Provider store={Store}>
            <App />
        </Provider>,
        document.querySelector('#app')
    );
}

render(App);