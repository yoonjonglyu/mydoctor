import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

const render = (App: React.FC) => {
    ReactDOM.render(
        <App />,
        document.querySelector('#app')
    );
}

render(App);