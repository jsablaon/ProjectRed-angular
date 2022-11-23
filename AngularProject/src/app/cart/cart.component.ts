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
    //   itemId: '2627',
    //   itemQty: 1,
    //   itemName: 'string',
    //   itemPrice: 2.94,
    //   itemImage: 'https://www.w3schools.com/images/w3schools_green.jpg',
    //   itemVideo: 'a',
    // };
    // this.itemService.addItem(fakeItem).subscribe();
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
    
    if(item){
      this.itemService.updateItem(item).subscribe();
    }

    this.itemService.getItems().subscribe((cartItems): CartItem[] => {
      //calculates subtotal
      this.subtotal = 0;
      cartItems.forEach((item) => {
        if(item.userId === sessionStorage.getItem('ID:')){
          this.subtotal += item.itemPrice * item.itemQty;
          //console.log(this.items);
        }
        
      });

      return this.items;
    });        

    //this.getItems();
  }

  delete(item: CartItem): void{
    //console.log("read");
    this.subtotal = 0;
    
    this.itemService.deleteItem(item).subscribe();

    this.itemService.getItems().subscribe((cartItems): CartItem[] => {
      //calculates subtotal
      this.items = [];
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

}
