import { Component, OnInit } from '@angular/core';

import { Gift } from '../gift';
import { TestListService } from '../test-list.service';
import { User } from '../user';
import { UserService } from '../user.service'


import { TargetService } from '../item.service';
import { TargetItem } from '../item'
import { TargetStore } from '../item'


@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {
  targetItems: TargetItem[] = [];
  targetStores: TargetStore[] = [];

  loggedIn: boolean = false;
  currentUser: User = { Name: '', Email: '', UserId:''};



  constructor(private targetService: TargetService, private testService: TestListService, private userService: UserService) { }

  ngOnInit(): void {
    // this.getGifts();
    this.getTargetStores();
    this.getTargetItems();
    
    if(sessionStorage.getItem('ID:') === null){
      this.currentUser.Name = 'Please Log In';
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.getUser();
      
    }
  }

  // getGifts(): void {
  //   // this.testService.getGifts()
  //   this.targetService.getItems()

  //   .subscribe(gifts => this.gifts = gifts);
  //   console.log(this.gifts);
  // }

  // Target functions
  getTargetItems(): void{
    //TODO: add params for getItems(userId, storeId)
    this.targetService.getItems()
    .subscribe(targetItems => this.targetItems = targetItems);
    console.log(this.targetItems);
  }

  getTargetStores(): void{
    this.targetService.getStores()
    .subscribe(targetStores => this.targetStores = targetStores);
    console.log(this.targetStores);
  }

  getUser(): void{      
    this.userService.getUser(sessionStorage.getItem('ID:')).subscribe(user => this.currentUser = user);
}

}

