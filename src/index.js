import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './global.css';
import LogApp from './components/LogApp';

const container = document.getElementById('app');

ReactDOM.render(<LogApp />, container);
