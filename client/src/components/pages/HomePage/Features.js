import React from 'react';
import Container from '@material-ui/core/Container';
import FeatureItem from './FeatureItem';
import { QrcodeOutlined, AreaChartOutlined, SnippetsOutlined } from '@ant-design/icons';
import './HomePage.scss';

const Features = () => {
    return (
        <Container className="home__features__items">
            <FeatureItem 
                icon={<SnippetsOutlined />}
                heading="Link Managment" 
                text="Manage all your links that you have ever shortened." 
            />
            <FeatureItem 
                icon={<AreaChartOutlined />}
                heading="Statistics"
                text="You can get info about quantity of clicks, counties, devices, systems." 
            />
            <FeatureItem 
                icon={<QrcodeOutlined />} 
                heading="QR Code" 
                text="Get beautiful QR code for your link." 
            />
        </Container>
    );
};

export default Features;
