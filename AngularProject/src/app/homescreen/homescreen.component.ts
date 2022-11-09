import { Component, OnInit } from '@angular/core';

import { Gift } from '../gift';
import { TestListService } from '../test-list.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {
  gifts: Gift[] = [];
  loggedIn: boolean = false;
  currentUser: string = 'Please Log In';


  constructor(private testService: TestListService) { }

  ngOnInit(): void {
    this.getGifts();

    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.currentUser = 'Welcome ' + sessionStorage.getItem('Name:');
    }
  }

  getGifts(): void {
    this.testService.getGifts()
    .subscribe(gifts => this.gifts = gifts);
    console.log(this.gifts);
  }

}

