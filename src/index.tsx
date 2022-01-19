import React from 'react';
import ReactDOM from 'react-dom';

const render = (App: React.FC) => {
    ReactDOM.render(
        <App />,
        document.querySelector('#app')
    );
};
