import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'summernote/dist/summernote.css';
import 'font-awesome/css/font-awesome.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import ReservationList from './components/reservationlist/reservationlist.js';


const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/reservationList" component={ReservationList} />
      </div>
    </Router>
  )


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
