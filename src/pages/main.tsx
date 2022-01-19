import React from 'react';

import LocationList from '../components/locationList';
import SearchLocation from '../components/searchLocation';

interface MainProps {

}

const Main: React.FC<MainProps> = () => {
    return (
        <main role="main">
            <h1>Hi MyDoctor</h1>
            <SearchLocation />
            <LocationList />
        </main>
    );
}

export default Main;