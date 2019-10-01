import React, { Component } from 'react';
import "./topbanner.css"

export default class TopBanner extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="row top-banner justify-content-center no-gutters">
            <div className="row align-items-center container p-3 no-gutters col-12 col-md-10">
                <div className="row col-6 col-md-4 justify-content-end no-gutters mw-100">
                    <h1 className="isucorp-title center-block"><strong>ISU</strong>Corp</h1>
                </div>
                <div className="row col d-none d-md-flex no-gutters justify-content-start mw-100">
                    <h4 className="h4">World Class <br /> Software Development</h4>
                </div>
                <div className="row col d-md-none justify-content-center mw-100">
                  <div style={{color:'white', cursor:'pointer'}}><i className="fa fa-caret-left" onClick={this.props.match}></i>Create Reservation</div>
                </div>
            </div>
        </div>
    );
  }
}