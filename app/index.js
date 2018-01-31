// Styles
import './general/scss/index.scss'
import '../.modernizrrc';

// SVG Sprite
const files = require.context('./general/svg', true, /^\.\/.*\.svg/);
files.keys().forEach(files);

// Application
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
    <App />,
    document.getElementById('reviews-app-root')
);
