import { Component, OnInit } from '@angular/core';

import { Gift } from '../gift';
import { TestListService } from '../test-list.service';

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
  currentUser: string = 'Please Log In';


  // constructor(private testService: TestListService) { }
  constructor(private targetService: TargetService) { }

  ngOnInit(): void {
    // this.getGifts();
    this.getTargetStores();
    this.getTargetItems();

    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.currentUser = 'Welcome ' + sessionStorage.getItem('Name:');
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

}

