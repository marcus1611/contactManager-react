import React, { Component } from 'react';
import $ from 'jquery';
import "jquery-ui-dist/jquery-ui.js";
import "jquery-ui-dist/jquery-ui.css";
import "summernote/dist/summernote.js";

window.$ = $;

export default class AddContact extends Component {

  constructor(props) {
    super(props);
    this.getContactUrl = props.getContactUrl;
    this.state = {
      id: props.Id ? props.Id : "",
      name: props.ContactName ? props.ContactName : "",
      birth: props.BirthDate ? props.BirthDate : "",
      type: props.ContactTypeId ? props.ContactTypeId : "",
      phone: props.PhoneNumber ? props.PhoneNumber : "",
      html: props.HtmlContent ? props.HtmlContent : ""
    };
    this.types = [
      {typeid: 1, name: "Contact Type A"},
      {typeid: 2, name: "Contact Type B"},
      {typeid: 3, name: "Contact Type C"},
      {typeid: 4, name: "Contact Type D"},
    ];

    this.initControls = this.initControls.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initControls);
 }

  handleChange = (e) =>{ 
    this.setState({[e.target.name]: e.target.value});
  }

  submit = (e) => {
    $.ajax({
      url: this.props.addContactUrl,
      method: 'PUT',
      data: {
        ContactName: this.state.name,
        BirthDate: this.state.birth,
        ContactTypeId: this.state.type,
        PhonNumber: this.state.phone,
        HtmlContent: $('.note-editable').html()
      },
      success: function (data) {
        window.location.href= "http://localhost:3000/reservationList";
      },
      error: function () {
        console.log('Error');
      } 
    });
  }


  getContact =  () => {

  }

  
  initControls = () => {
    $('.datepicker').ready(() => {
      $('.datepicker').datepicker({
                  showOtherMonths: true,
                  selectOtherMonths: true,
                  showAnim: "clip",
                  dateFormat: "mm/dd/yy",
                  minDate: "01/01/1900",
                  maxDate: "12/31/2010",
                  changeMonth: true,
                  changeYear: true,
                  yearRange: "1925:2010",
                  onSelect : (datesel) => {
                    this.setState({['birth']: datesel});
                  }
        })
    });
    $('.summernote').ready(() => {
          $('.summernote').summernote({
              toolbar: [
                 ['view', ['undo', 'redo']],
                 ['para', ['style']],
                 ['style', ['bold', 'italic', 'underline']],
                 ['para', ['paragraph', 'ul', 'ol']],
                 ['insert', ['link', 'picture', 'video']]
              ],
              placeholder: 'add some content ...'
        });
    }); 
  }
  // initControls = () => {
  //   $('.summernote').ready(() => {
  //     $('.summernote').summernote({
  //         toolbar: [
  //            ['view', ['undo', 'redo']],
  //            ['para', ['style']],
  //            ['style', ['bold', 'italic', 'underline']],
  //            ['para', ['paragraph', 'ul', 'ol']],
  //            ['insert', ['link', 'picture', 'video']]
  //         ],
  //         placeholder: 'add some content ...'
  //       });
  //   }); 

    
  // }

  render() {
    return (
      <div className="container body-content" id="create_reservation" >
          <form className="form-reservation" onSubmit={this.submit}>
            <div className="jumbotron mt-3 mb-3 p-2" > 
                <div className="row">
                    <input type="hidden" value={this.state.id} className="hidden-input" />
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="sizing-addon1" style={{backgroundColor: 'white'}}><img className="img-mode" src="images/name.png" /></span>
                        </div>
                        <input type="text" className="form-control border-left-0 pl-0 pr-0" name="name" placeholder="Name ..." value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="input-group input-group-lg dropdown">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="sizing-addon2" style={{backgroundColor: 'white'}}><img className="img-mode" src="images/type.png" /></span>
                          </div>
                          <select className="form-control border-left-0 pl-0 pr-0 m-0" name="type" style={{ WebkitAppareance: 'none', color: '#9f9f9f'}} value={this.state.type} onChange={this.handleChange} >
                              <option value="0">Contact Type ...</option>
                            {
                              this.types.map((type, i) => {     
                                  return (<option key={type.typeid} value={type.typeid}>{type.name}</option>);
                              })
                            }
                          </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="sizing-addon3" style={{backgroundColor: 'white'}}><img className="img-mode" src="images/phone.png" /></span>
                        </div>
                        <input type="tel" name="phone" className="form-control border-left-0 pl-0 pr-0" placeholder="Phone:" value={this.state.phone} onChange={this.handleChange} />

                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="input-group input-group-lg">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="sizing-addon4" style={{backgroundColor: 'white'}}><img className="img-mode" src="images/birth.png" /></span>
                          </div>
                          <input type="text" name="birth" className="datepicker form-control border-left-0 pl-0 pr-0" placeholder="Birth Date:" value={this.state.birth} onChange={this.handleChange}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="jumbotron p-3 mb-3">
              <textarea className="summernote" value={this.state.html} onChange={this.handleChange}></textarea>
            </div>
            <div className="row mb-3 justify-content-end no-gutters">
                <input type="submit" className="submit-button pl-4 pr-4 p-2" value="Save"  />
            </div>
          </form>
        </div>
    );
  }
}