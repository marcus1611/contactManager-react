import React, { Component } from 'react';
import $ from 'jquery';
import "./reservationlist.css";
import TopBanner from '../topbanner/topbanner.js';
import SecondaryBanner from '../secondarybanner/secondarybanner.js';
window.$ = $;

export default class ReservationList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentPage: 1,
      totalPages: 0,
      sortField: 0,
      sortAscending: true,
      pages: []
    }

    this.initControls = this.initControls.bind(this);
    this.navigate = this.navigate.bind(this);

    this.searchUrl = 'http://localhost:1433/api/contacts/search';
    this.deleteUrl = 'http://localhost:1433/api/contacts/delete';
  }


  componentDidMount() {
    window.addEventListener('load', this.initControls);
  }

  navigate(pageNumber) {
    this.setState(st => ({ loading: true }));
    $.ajax({
        url: this.searchUrl,
        type: 'POST',
        data: {
            PageNumber: pageNumber,
            SortField: this.state.sortField,
            SortAscending: this.state.sortAscending,
            PageSize: this.props.pageSize
        },
        success: (data) => {
          this.setState(st => ({ 
            contacts: data.Result, 
            totalPages: data.TotalPages, 
            totalRecords: data.TotalRecords, 
            currentPage: pageNumber, 
            loading: false,
            pages: new Array(data.TotalPages, 0)
          }));
          
        },
        error: () => {
          this.setState(st => ({ 
            contacts: [], 
            totalPages: 0, 
            totalRecords: 0, 
            currentPage: 1, 
            loading: false,
            pages: []
          }));
        }
      });
  }

  delete(elm) {
    $.ajax({
        type: 'DELETE',
        url: this.deleteUrl + '/' + elm.Id,
        success: () => {
          this.navigate(1);
        }
    });
  };

  initControls() {
    this.navigate(1);
  }

  sortbyname() {
    this.setState(st =>  ({ sortField : 1 }));
    this.navigate(this.state.currentPage);
  }

  isReservationList() { return true; }


  render() { 
    return (
      <div>
        <TopBanner />
        <SecondaryBanner isReservationList="true" forceUpdateContainer = {this.forceUpdateContainer}/>
        <div className="container body-content">
          <div className="jumbotron p-2 mt-3" id="reservation_list" >
            {
              this.state.loading ? 
                <div className="row align-items-center justify-content-center">
                  <img src="images/loading.gif" />
                </div>
                : ""
            }
            
            
            <div className="row">
                <div className="col-12 col-md-3">
                    <div className="dropdown">
                        <a className="row btn btn-secondary dropdown-toggle w-100 no-gutters d-flex" id="dropdownMenuButton" data-toggle="dropdown" style={{color:'#9f9f9f'}}>
                            <div className="col-2"><img src="images/sort_by.png" style={{textAlign: 'left'}} /></div>
                            <div className="col">Sort By</div>
                            <span className="row col fa fa-caret-down align-self-end no-gutters" style={{textAlign: 'right',cursor: 'pointer'}}></span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={this.sortbyname}>Sort By Name</a>
                            <a className="dropdown-item" onClick={this.sortbyphone}>Sort By Phone</a>
                            <a className="dropdown-item" onClick={this.sortbytype}>Sort By Type</a>
                            <a className="dropdown-item" onClick={this.sortbybirth}>Sort By Birth</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2 justify-content-center no-gutters" id="list-container">
                {
                  this.state.contacts ? 
                    this.state.contacts.map((item, key) => 
                        <div className="row col-12 contacts_row align-items-center mb-3 no-gutters p-1" key={key}>
                            <div className="col">
                                <p className="name_field mb-0">{item.ContactName}</p>
                                <p className="birth_field mb-0">{item.BirthDate}</p>
                            </div>
                            <div className="col type_field">{'Contact Type ' + item.ContactType}
                            </div>
                            <div className="col d-none d-md-block phone_field" >{item.PhoneNumber}
                            </div>
                            {/* <div className="row col justify-content-end no-gutters" >
                                <a className="create_edit_button p-2 pr-4 pl-4" style={{cursor: 'pointer'}} onClick={() => this.edit(item)}>Edit</a>
                            </div> */}
                            <div className="row col-1 justify-content-center no-gutters">
                                <a className="fa fa-trash-o" style={{fontSize: '1.5em',cursor: 'pointer'}} onClick={() => this.delete(item)}></a>
                            </div>
                        </div>
                    )
                  : ""
                }
                
            </div>

            <div className="col-xs-12 col-sm-9">
                <nav aria-label="Page navigation" className="text-right">
                    <ul className="pagination">
                      {
                        this.state.currentPage > 1 ? 
                          <li onClick={ () => this.navigate(this.state.currentPage - 1)} className="page-item">
                              <a aria-label="Previous" className="page-link">
                                  <span aria-hidden="true">&laquo;</span>
                              </a>
                          </li>
                          : ""
                      }
                      {
                        this.state.pages.map((item, key) => 
                          <li key={key} className="page-item">
                              <a onClick={() => this.navigate(key + 1)} className="page-link">{key + 1}</a>
                          </li>
                        )
                      }

                      {
                        this.state.currentPage < this.state.totalPages ? 
                          <li onClick={() => this.navigate(this.state.currentPage + 1)} className="page-item">
                            <a aria-label="Next" className="page-link">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>
                          : ""
                      }
                    </ul>
                </nav>
            </div>
        </div>
      </div>
    </div>

    );
  }
}