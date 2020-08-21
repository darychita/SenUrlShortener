import React from 'react';
import InfoPage from './InfoPage';

const Page404 = () => {
    return (
        <InfoPage 
            message={404}
            subMessage="Seems, you are lost"
        />
    );
};

export default Page404;
