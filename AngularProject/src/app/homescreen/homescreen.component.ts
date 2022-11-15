import { Component, OnInit } from '@angular/core';

import { Gift } from '../gift';
import { TestListService } from '../test-list.service';
import { User } from '../user';
import { UserService } from '../user.service'


@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {
  gifts: Gift[] = [];
  loggedIn: boolean = false;
  currentUser: User = { Name: '', Email: '', UserId:''};


  constructor(private testService: TestListService, private userService: UserService) { }

  ngOnInit(): void {
    this.getGifts();

    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.getUser();
      
    }
  }

  getGifts(): void {
    this.testService.getGifts()
    .subscribe(gifts => this.gifts = gifts);
    console.log(this.gifts);
  }

  getUser(): void{      
    this.userService.getUser(sessionStorage.getItem('ID:')).subscribe(user => this.currentUser = user);
}

}

