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
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
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

}
