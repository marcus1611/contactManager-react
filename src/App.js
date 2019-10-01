import React, { Component } from 'react';
import TopBanner from './components/topbanner/topbanner.js';
import SecondaryBanner from './components/secondarybanner/secondarybanner.js';
import Container from './components/container/container.js';
import AddContact from './components/addcontact/addcontact.js';

export default class App extends Component {

  constructor(props) {
    super(props);
    // this.URLs = {
    //   search: "api/contacts/search",
    //   add: "api/contacts/add"
    // }
  }

  isReservationList() { return false; }

  render() {
    return (
      <div>
        <TopBanner />
        <SecondaryBanner isReservationList="false" forceUpdateContainer = {this.forceUpdateContainer}/>
        <AddContact addContactUrl={'http://localhost:1433/api/contacts/add'}/>
      </div>
    );
  }
}
