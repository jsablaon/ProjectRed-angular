import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  @ViewChild("usersName") usersName: ElementRef;
  @ViewChild("usersEmail") usersEmail: ElementRef;

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
      // console.log(this.currentUser);
      // this.tempUser = 'Welcome, ' + this.currentUser.Name;
    }
  }

  updateUser(): void{
    this.currentUser.Name = this.usersName.nativeElement.value;
    this.currentUser.Email = this.usersEmail.nativeElement.value;
    //console.log(this.currentUser.Name);
    if(this.currentUser){
      //console.log(this.currentUser.Name);
      this.userService.updateUser(this.currentUser).subscribe();
    }

    //this.getItems();
  }
  getUser(): void{      
    this.userService.getUser(sessionStorage.getItem('ID:')).subscribe(user => this.currentUser = user);
    
    
}


}
