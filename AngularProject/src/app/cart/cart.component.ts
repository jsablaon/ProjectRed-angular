import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  items: Item[] = [];
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
    this.itemService.getItems().subscribe((items): Item[] => {
      
      //calculates subtotal
      items.forEach((item) => {
        this.subtotal += item.price * item.qty;
      });

      return this.items = items;
    });
  }

  updateItem(item: Item): void{
    if(item){
      this.itemService.updateItem(item).subscribe();
    }

    this.getItems();
  }

  delete(item: Item): void{
    this.items = this.items.filter(h => h !== item);
    this.itemService.deleteItem(item.id).subscribe();
  }

}
