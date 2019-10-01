import React, { Component } from 'react';
import ReservationList from '../reservationlist/reservationlist.js';
import AddContact from '../addcontact/addcontact.js';
import SecondaryBanner from '../secondarybanner/secondarybanner.js';

export default class Container extends Component {

  constructor(props) {
    super(props);
    this.state = { showReservationList: false };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
    
  }

  toggleVisibility = () => {
    this.setState({showReservationList: !this.state.showReservationList});
  }

  forceUpdateContainer = () => {
      this.forceUpdate();
  }

  isReservationList = () => {
      return this.state.showReservationList;
  }

  render() {
    return (
        <div>
        <SecondaryBanner toggleVisibility = {this.toggleVisibility} forceUpdateContainer = {this.forceUpdateContainer}/>
       {/* { this.state.showReservationList ? <ReservationList toggleVisibility = {this.toggleVisibility} /> : <AddContact toggleVisibility = {this.toggleVisibility} /> } */}
       <AddContact addContactUrl={'http://localhost:1433/api/contacts/add'}  />
       {/* <ReservationList searchUrl={'http://localhost:1433/api/contacts/search'} deleteUrl={'http://localhost:1433/api/contacts/delete'}/> */}
        </div>
    );
  }
}