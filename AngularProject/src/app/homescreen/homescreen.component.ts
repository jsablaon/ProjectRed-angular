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


  constructor(private testService: TestListService) { }

  ngOnInit(): void {
    this.getGifts();
  }

  getGifts(): void {
    this.testService.getGifts()
    .subscribe(gifts => this.gifts = gifts);
    console.log(this.gifts);
  }

}

