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
    //   itemId: '262355273',
    //   itemQty: 1,
    //   itemName:'di',
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
    this.items = cartItems.filter((i) => i.userId !== sessionStorage.getItem('ID:'));
      return this.items;
    });
    this.updateSub();
  }
  updateSub(): void{
    this.items.forEach((pItem) => {
      this.subtotal += pItem.itemPrice * pItem.itemQty;      
    });
  }

  updateItem(item: CartItem): void{
    this.subtotal = 0;
    //update item
    this.itemService.updateItem(item).subscribe();
    this.updateSub();
  }

  delete(item: CartItem): void{
    this.subtotal = 0;
    this.itemService.deleteItem(item).subscribe();

    let newList = this.items.filter(data => data != item);
    this.items = newList;
    this.updateSub();
  }

}
