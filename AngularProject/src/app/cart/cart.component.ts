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
  fakeItem: CartItem;
  subtotal: number = 0;
  loggedIn: boolean = false;
  currentUser: string = 'Please Log In';

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    // let fakeItem = {
    //   userId: sessionStorage.getItem('ID:'),
    //   storeId: '12633',
    //   itemId: '2623273',
    //   itemQty: 1,
    //   itemName:'ding',
    //   itemPrice: 2.94,
    //   itemImage: 'https://www.w3schools.com/images/w3schools_green.jpg',
    //   itemVideo: 'a',
    // };
    // this.itemService.addItem(fakeItem).subscribe();
    
    
    if(sessionStorage.getItem('ID:') === null){
      this.loggedIn = false;
    }
    else {
      this.loggedIn = true;
      this.currentUser = 'My Cart';
      this.getItems();
    }
  }


  getItems(): void {
    
    this.subtotal = 0;
    this.itemService.getItems().subscribe((cartItems): CartItem[] => {
      
      //calculates subtotal
      cartItems.forEach((item) => {
        if(item.userId === sessionStorage.getItem('ID:')){
          this.items.push(item);
          this.subtotal += item.itemPrice * item.itemQty;
          //console.log(this.items);
        }
        
      });

      return this.items;
    });
  }

  updateItem(item: CartItem): void{
    this.subtotal = 0;
    if(item){
      this.itemService.updateItem(item).subscribe();
    }
    let objIndex = this.items.findIndex((obj => obj == item))
    this.items[objIndex] = item;

    this.items.forEach((item) => {
      this.subtotal += item.itemPrice * item.itemQty;      
    });
  }

  delete(item: CartItem): void{
    //console.log("read");
    this.subtotal = 0;
    //console.log(item);
    this.itemService.deleteItem(item).subscribe();

    let newList = this.items.filter(data => data != item);
    this.items = newList;
    this.items.forEach((item) => {
      this.subtotal += item.itemPrice * item.itemQty;      
    });
  }

}
