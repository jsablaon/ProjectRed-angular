import { Component } from '@angular/core';
@Component({
  selector: 'app-login',
  template: `
    <signin></signin>
    `
})
export class LoginComponent {
  constructor() { console.clear(); }
}
@Component({
  selector: 'signin',
  template: `<h1>{{title}}</h1>
   <google-signin></google-signin>`
})
export class SignInComponent {
  title     = "signin page";
  constructor() { console.clear(); }
}
