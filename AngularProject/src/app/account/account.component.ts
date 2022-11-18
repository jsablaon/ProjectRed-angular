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
      this.currentUser.Name = 'Please Log In'
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.getUser();
    }
  }

  getUser(): void{      
      this.userService.getUser(sessionStorage.getItem('ID:')).subscribe(user => this.currentUser = user);
  }
  

}
