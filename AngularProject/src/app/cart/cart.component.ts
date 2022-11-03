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
  tax:number = 0;
  // x:number = 0;
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe((items): Item[] => {
      // items.forEach(this.getSubtotal);
      for(let i = 0; i < items.length; i++){ 
        this.subtotal += items[i].price * items[i].qty;
      }
      // this.x += 1;
      return this.items = items;
    });
  }

  // getSubtotal(item) {
  //   this.subtotal = 4;
  // }

}
