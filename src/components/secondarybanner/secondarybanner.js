import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

export default class SecondaryBanner extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="row secondary-banner justify-content-center">
            <div className="row container align-items-center p-3 no-gutters">
                <div className="row col-12 col-md-4 justify-content-start no-gutters p-2 mw-100">
                    <h4 className="reservation_list">{ this.props.isReservationList == "true" ? 'List Reservation' :'Create Reservation' }</h4>
                </div>
                <div className="row col-12 col-md-5 align-items-center no-gutters justify-content-center mw-100">
                    <p className="mb-0 lorem_ipsum">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="row col-3 d-none d-md-flex justify-content-end p-2 mw-100 no-gutters">
                  <div className="create_edit_button p-2" style={{color:'white', cursor:'pointer'}} >
                    <a href={ this.props.isReservationList == "true" ? 'http://localhost:3000' : 'http://localhost:3000/reservationList'} style={{color:'white', cursor:'pointer'}} >
                      <i className="fa fa-caret-left" ></i> { this.props.isReservationList == "true" ? 'Create Reservation' : 'List Reservation'}
                    </a>
                  </div>
                </div>
            </div>
        </div>
    );
  }
}