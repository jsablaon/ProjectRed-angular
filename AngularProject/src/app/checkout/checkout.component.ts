import { Component, OnInit } from '@angular/core';

import { CartItem } from '../item';
import { Item } from '../item';
import { ItemService } from '../item.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items: CartItem[] = [];
  subtotal:number = 0;
  loggedIn: boolean = false;
  currentUser: string = 'Please Log In';

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();

    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.currentUser = 'Checkout';
    }
  }

  getItems(): void {
    this.items = [];
    this.subtotal = 0;
    this.itemService.getItems().subscribe((items): CartItem[] => {
      
      //calculates subtotal
      items.forEach((item) => {
        if(item.userId == sessionStorage.getItem('ID:')){
          this.items.push(item);
          this.subtotal += item.itemPrice * item.itemQty;
        }
      });

      return this.items;
    });
  }

}
