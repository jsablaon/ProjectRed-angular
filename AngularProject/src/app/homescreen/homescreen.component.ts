import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {
  loggedIn: boolean = false;
  currentUser: string = 'Please Log In';

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
      else if(sessionStorage.getItem('ID:').length > 5){
      this.loggedIn = true;
      this.currentUser = 'Welcome ' + sessionStorage.getItem('Name:');
    }
  }

}

