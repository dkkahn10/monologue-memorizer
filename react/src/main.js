import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

$(function() {
  ReactDOM.render(
    <App id={window.location.href.split("/")[4]}/>,
    document.getElementById('react')
  );
});
