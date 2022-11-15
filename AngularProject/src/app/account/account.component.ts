import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service'


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  loggedIn: boolean = false;
  currentUser: User = { Name: '', Email: '', UserId:''};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.currentUser.Name = sessionStorage.getItem('Name:');
      this.currentUser.Email = sessionStorage.getItem('Email');
      this.currentUser.UserId = sessionStorage.getItem('ID:');
    }
  }

}
