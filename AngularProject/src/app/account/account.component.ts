import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  loggedIn: boolean = false;
  currentUserName: string = '';
  currentUserEmail: string = '';
  currentUserId: string = '';

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.currentUserName = sessionStorage.getItem('Name:');
      this.currentUserEmail = sessionStorage.getItem('Email');
      this.currentUserId = sessionStorage.getItem('ID:');
    }
  }

}
