import React from 'react';

import LocationList from '../components/locationList';

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    return (
        <main role="main">
            <h1>Hi MyDoctor</h1>
            <LocationList />
        </main>
    );
}

export default Main;