import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

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
  @ViewChild('zipcodeInput') zipcodeInput: ElementRef;
  @ViewChild('keywordInput') keywordInput: ElementRef;

  targetItems: TargetItem[] = [];
  targetStores: TargetStore[] = [];

  loggedIn: boolean = false;
  currentUser: User = { Name: '', Email: '', UserId:''};

  constructor(private targetService: TargetService, private testService: TestListService, private userService: UserService) { }

  ngOnInit(): void {
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
  getTargetItems(storeId: string, keyword: string, userId: string): void{
    this.targetService.getItems(storeId, keyword, userId)
    .subscribe(targetItems => this.targetItems = targetItems);
    console.log(this.targetItems);
  }

  getTargetStores(zip: string, userId: string): void{
    this.targetService.getStores(zip, userId)
    .subscribe(targetStores => this.targetStores = targetStores);
    console.log(this.targetStores);
  }

  findStores():void{
    console.log("===========> finding stores...", this.zipcodeInput.nativeElement.value)
    let zipcode: string = this.zipcodeInput.nativeElement.value
    let userId: string = sessionStorage.getItem('ID:')
    console.log(`+++++++++++++++++++++++> userId: ${userId}`)
    this.targetService.findStores(zipcode, userId)
    // should call getTargetStores()
    setTimeout( () => {
      this.getTargetStores(zipcode, userId);
    }, 10000)

  }

  selectStore(storeId: string):void{
    sessionStorage.setItem("storeId", storeId)
    console.log(`++++++++++++++++++++> storeid: ${storeId}`)
    let sessionStoreId = sessionStorage.getItem("storeId")
    console.log(`session store id = ${sessionStoreId}`)
  }

  findItems():void{
    let storeId = sessionStorage.getItem("storeId")
    let userId = sessionStorage.getItem('ID:')
    let keyword = this.keywordInput.nativeElement.value

    console.log(`===============> storeId: ${storeId} | keyword: ${keyword}`)

    this.targetService.findItems(storeId, keyword, userId)
    setTimeout( () => {
      this.getTargetItems(storeId, keyword, userId);
    }, 10000)
  }

  selectItem(userId: string, storeId: string, itemId: string){
    console.log(`++++++selected item = userId:${userId} | storeId:${storeId} | itemId:${itemId}`)
    // TODO: add logic here to push items to cart
  }

  getUser(): void{      
    this.userService.getUser(sessionStorage.getItem('ID:')).subscribe(user => this.currentUser = user);
}

}

