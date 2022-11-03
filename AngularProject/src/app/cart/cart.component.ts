import { Component, SimpleChanges, OnInit, OnChanges, Input } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnChanges, OnInit {
  items: Item[] = [];
  subtotal:number = 0;
  // @Input() qty: number;
  tax:number = 0;
  Sub:number = 0;
  // x:number = 0;
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    
    //  //runs once for each item in the cart
    //  for(let i = 0; i < this.items.length; i++){ 
    //   this.subtotal += this.items[i].price * this.items[i].qty;
    // }
  }

  getItems(): void {
    this.subtotal = 0;
    this.itemService.getItems().subscribe((items): Item[] => {
      // items.forEach(this.getSubtotal);

      //runs once for each item in the cart
      for(let i = 0; i < items.length; i++){ 
        this.subtotal += items[i].price * items[i].qty;
      }
      // this.x += 1;
      return this.items = items;
    });
  }
  
  findSubTotal() {
    this.subtotal = 0;
    for(let i = 0; i < this.items.length; i++){ 
    let sub = Number(document.getElementById(i.toString()).getAttribute("value"));
         
      this.subtotal += sub;
      }
    // this.items.forEach(function (item) {
    //   this.subtotal += item.price * item.qty;
    // });
  //    for(let i = 0; i < this.items.length; i++){ 
  //     let sub = Number(document.getElementById(i.toString()).getAttribute("value"));
     
  //     this.Sub += sub;
  //    }
  //     return this.Sub;
    
  }

  mySub(Item){
    
  }


}
