// this login scheme was derived from this article
//  https://stackoverflow.com/questions/42279585/how-to-use-google-api-from-different-components-of-angular
import {Component, ElementRef, AfterViewInit} from '@angular/core';
declare const gapi: any;
@Component({
  selector: 'google-signin',
  template: '<button id="googleBtn">Google Sign-In</button>'
})
export class GoogleSigninComponent implements AfterViewInit {
  private clientId:string = '906955082367-08m0813cvptb5d8g15ecat9u8r0tj28k.apps.googleusercontent.com';
  
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let profile = googleUser.getBasicProfile();
       // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //MY CODE HERE  save 2 vlaues to this session's strorage
          sessionStorage.setItem('ID:', profile.getId() );
          sessionStorage.setItem('Name:', profile.getName() );
        window.location.href = '/Home';
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
  constructor(private element: ElementRef) { console.log('ElementRef: ', this.element); }
  ngAfterViewInit() {
    this.googleInit();
  }}
