import { Component, OnInit } from '@angular/core';
import { CartItem } from '../item';

import { Item } from '../item';
import { ItemService } from '../item.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
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
      this.currentUser = 'My Cart';
    }
  }


  getItems(): void {
    this.subtotal = 0;
    this.itemService.getItems().subscribe((cartItems): CartItem[] => {
      
      //calculates subtotal
      cartItems.forEach((item) => {
        this.subtotal += item.itemPrice * item.itemQty;
        console.log(this.subtotal);
      });

      return this.items = cartItems;
    });
  }

  updateItem(item: CartItem): void{
    if(item){
      this.itemService.updateItem(item).subscribe();
    }

    this.getItems();
  }

  delete(item: CartItem): void{
    console.log("read");
    this.items = this.items.filter(h => h !== item);
    this.itemService.deleteItem(item.itemId).subscribe();
    this.getItems();
  }

}
