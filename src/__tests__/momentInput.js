import React from 'react';
import ReactDOM from 'react-dom';
import MomentInput from '../lib';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MomentInput />, div);
});
