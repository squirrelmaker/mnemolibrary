import React, { Component } from 'react';
import 'whatwg-fetch'
//import Speechify from './Speechify'
let style={height:'1.2em'}
const userIcon = 
<svg style={style} aria-hidden="true" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>

const reviewIcon = 
<svg style={style}  aria-hidden="true" data-prefix="fas" data-icon="charging-station" class="svg-inline--fa fa-charging-station fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M336 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h320c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm208-320V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-32V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-16c-8.84 0-16 7.16-16 16v32c0 35.76 23.62 65.69 56 75.93v118.49c0 13.95-9.5 26.92-23.26 29.19C431.22 402.5 416 388.99 416 372v-28c0-48.6-39.4-88-88-88h-8V64c0-35.35-28.65-64-64-64H96C60.65 0 32 28.65 32 64v352h288V304h8c22.09 0 40 17.91 40 40v24.61c0 39.67 28.92 75.16 68.41 79.01C481.71 452.05 520 416.41 520 372V251.93c32.38-10.24 56-40.17 56-75.93v-32c0-8.84-7.16-16-16-16h-16zm-283.91 47.76l-93.7 139c-2.2 3.33-6.21 5.24-10.39 5.24-7.67 0-13.47-6.28-11.67-12.92L167.35 224H108c-7.25 0-12.85-5.59-11.89-11.89l16-107C112.9 99.9 117.98 96 124 96h68c7.88 0 13.62 6.54 11.6 13.21L192 160h57.7c9.24 0 15.01 8.78 10.39 15.76z"></path></svg>


const helpIcon = 
<svg style={style}  aria-hidden="true" data-prefix="fas" data-icon="question" class="svg-inline--fa fa-question fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"></path></svg>


const createIcon = 
<svg style={style}  aria-hidden="true" data-prefix="fas" data-icon="folder-plus" class="svg-inline--fa fa-folder-plus fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zm-96 168c0 8.84-7.16 16-16 16h-72v72c0 8.84-7.16 16-16 16h-16c-8.84 0-16-7.16-16-16v-72h-72c-8.84 0-16-7.16-16-16v-16c0-8.84 7.16-16 16-16h72v-72c0-8.84 7.16-16 16-16h16c8.84 0 16 7.16 16 16v72h72c8.84 0 16 7.16 16 16v16z"></path></svg>

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
        //this.isAdmin = this.isAdmin.bind(this);
    };
    
    authorize() {
     //   //console.log(['AUTHORIZE'])
        //fetch('/oauth/token',{method: 'POST',headers: {
    //'Content-Type': 'application/x-www-form-urlencoded'
  //}})
       fetch('/oauth/authorize',{method: 'GET',headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }})
      .then(function(response) {
       // //console.log(['got response', response.text()])
      //  return response.json()
      })
      //.then(function(json) {
          ////console.log(['create indexes', json])
        //that.createIndexes(json);
      //})
      .catch(function(ex) {
        //console.log(['parsing failed', ex])
      })
 
    };
    

    startReview() {
        this.props.setCurrentTopic('');
        this.props.setCurrentPage('review')
    };
    
    goHome() {
        this.props.hideCollection();
        this.props.setCurrentPage('splash')
    };
    
    import(e) {
        this.props.import();
    };
    //<div style={{position: 'fixed', right: '6.1em',  zIndex:99, marginTop: '0.4em'}}><Speechify/></div>
          //<div className='page-title' style={{float:'right',color:'yellow',fontSize:'1.2em', position: 'fixed', left: '6.1em',  zIndex:99, marginTop: '0.4em'}} >&nbsp;&nbsp;{this.props.title}&nbsp;&nbsp;&nbsp;{!this.props.isLoggedIn() && <a   onClick={() => this.props.setCurrentPage('splash')} href='#' className='btn btn-outline btn-warning' style={{display:'inline'}}>
                   //Tutorial
                  //</a>}</div>
    render() {
        return  (
        <div className="navbar-dark fixed-top bg-dark" >
            
        <nav className="navbar navbar-expand-md" >
       <div className="navbar-brand" >
          <a  href="#" onClick={this.goHome}><img alt="Mnemos' Library" src="/mnemoicon-100.png"  data-toggle="collapse" data-target="#navbarCollapse" style={{float:'left',clear:'right' ,height:'4em'}}  /></a>
       
       <div className='page-title' style={{color:'yellow',fontSize:'1.2em',  zIndex:99, marginTop: '0.1em'}} >&nbsp;&nbsp;{this.props.title}&nbsp;&nbsp;&nbsp;</div>
          
              <span style={{marginLeft:'1em'}} className="dcol-4">
                <a className="btn btn-secondary" href="#"  onClick={() => this.startReview.bind(this)()} >{reviewIcon} <span  className="d-none d-sm-inline">Review</span></a>
              </span>
              {this.props.isLoggedIn() && 
              <span className="dcol-4">
                <a className="btn btn-secondary"  href="#" onClick={() => this.props.setCurrentPage('create')}>{createIcon} <span  className="d-none d-sm-inline">Create</span></a>
              </span>}
              {!this.props.isLoggedIn() && 
              <span className="dcol-4">
                <a className="btn btn-secondary"  href="#" onClick={() => this.props.setCurrentPage('createhelp')}>{createIcon} <span  className="d-none d-sm-inline">Create</span></a>
              </span>}
            
              <span className="dcol-4">
                <a className="btn btn-secondary" href="#" onClick={() => this.props.setCurrentPage('about')}>{helpIcon} <span  className="d-none d-sm-inline">Help</span></a>
                
              </span>
              <span className="dcol-4">
                
                {this.props.isLoggedIn() && <a href='#' onClick={() => this.props.setCurrentPage('profile')} className='btn btn-secondary'>
                   {userIcon} <span  className="d-none d-sm-inline">Profile</span>
                  </a>}
                  {!this.props.isLoggedIn() && <a  href='#' onClick={() => this.props.setCurrentPage('login')} className='btn btn-outline btn-warning' style={{marginLeft: '1em'}}>
                   {userIcon} <span  className="d-none d-sm-inline">Login</span>
                  </a>}
              </span>
           
          </div>
            
        </nav>
          
        </div>
        )
    };
    
}
Navigation.pageTitles= {'splash':'Mnemo\'s Library', 'home':'Mnemo\'s Library','topics':'Topic Search','tags':'Tag Search','search':'Question Search','review':'Review','create':'Create','createhelp':'Create','about':'About Mnemo','info':'Getting Started','login':'','profile':'Profile','intro':'Getting Started','termsofuse':'Terms of Use','faq':'Frequently Asked Questions'}

    //<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" >
            //<span className="navbar-toggler-icon"></span>
          //</button>
//<div className="col-4" >
                //<a className="btn btn-secondary"  href="#"  onClick={() => this.props.setQuizFromDiscovery()}>Discover</a>
              //</div>
              //<div className="col-4">
                //<a className="btn btn-secondary" href="#"  onClick={() => this.props.setCurrentPage('topics')}>Search</a>
              //</div>
