import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  loggedIn: boolean = false;
  currentUser: string = 'Please Log In';
  Name: string = sessionStorage.getItem('Name:');
  Email: string = sessionStorage.getItem('Email');

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.currentUser = 'My Account';
    }
  }

}
