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
  guestUser: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
    if(sessionStorage.getItem('ID:') === null){
      this.currentUser.Name = 'Please Log In'
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      if (sessionStorage.getItem('ID:')=='123')
      {
        this.guestUser = true;
        this.currentUser.Name="GUEST"
        this.currentUser.Email="For a more personalized experience, sign in with Google!"
      }
      else 
      {
        this.guestUser= false;
      }
      this.getUser();
    }
  }

  getUser(): void{      
      this.userService.getUser(sessionStorage.getItem('ID:')).subscribe(user => this.currentUser = user);
  }
  

}
