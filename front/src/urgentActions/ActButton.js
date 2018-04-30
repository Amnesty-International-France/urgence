import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../themes/Button';

const ActButton = () => (
    <Link to="/message">
        <Button label="Ok J'agis" />
    </Link>
);

export default ActButton;
