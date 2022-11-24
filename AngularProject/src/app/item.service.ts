import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {CartItem, Carts, Item, TargetItem, TargetStore} from './item';
import { RandomStoresObject } from './randomObjects';

import {ITEMS} from './mock-items';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CartComponent } from './cart/cart.component';

@Injectable({ providedIn: 'root' })
export class ItemService {

  constructor( private http: HttpClient) { }

  getItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>('http://localhost:3000/items');
  }

  getItem(id: string): Observable<CartItem> {
    return this.http.get<CartItem>('http://localhost:3000/items' + id);
  }

  updateItem(item: CartItem): Observable<any> {
    //console.log("item.id");
    return this.http.put('http://localhost:3000/items/' + sessionStorage.getItem('ID:'), item);
  }

  deleteItem(item: CartItem): Observable<any> {
    //console.log(item.itemId);
    return this.http.delete('http://localhost:3000/items/' + item.itemId);
  }

  addItem(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>('http://localhost:3000/items', item);
  }

  addCart(cart: Carts): Observable<Carts> {
    console.log(cart);
    return this.http.post<Carts>('http://localhost:3000/cart', cart);
  }

  getCarts(): Observable<Carts[]> {
    return this.http.get<Carts[]>('http://localhost:3000/cart');
  }

  // getItems(): Observable<Item[]> {
  //   const items = of(ITEMS);
  //   return items;
  // }
  // getItem(id: number): Observable<Item>{
  //   const item = ITEMS.find(h => h.id === id)!;
  //   return of(item);
  // }
}



// Target Service 
@Injectable({ providedIn: 'root' })
export class TargetService {

  constructor( private http: HttpClient) { }

  getItems(storeId: string, keyword: string, userId: string): Observable<TargetItem[]> {
    return this.http.get<TargetItem[]>(`http://localhost:3000/targetapi/getitems?userId=${userId}&storeId=${storeId}&keyword=${keyword}`);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>('http://localhost:3000/items' + id);
  }

  updateItem(item: Item): Observable<any> {
    console.log("item.id");
    return this.http.put('http://localhost:3000/items/' + item.id, item);
  }

  deleteItem(id: number): Observable<string> {
    return this.http.delete<string>('http://localhost:3000/items/' + id);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>('http://localhost:3000/items', item);
  }

  // stores
  getStores(zip: string, userId: string): Observable<TargetStore[]> {
    return this.http.get<TargetStore[]>(`http://localhost:3000/targetapi/getstores?userId=${userId}&zip=${zip}`);
  }

  findStores(zip: string, userId: string){
    let urlStr = `http://localhost:3000/targetapi/savetargetstore?userId=${userId}&zip=${zip}`
    console.log(`urlStr is ${urlStr}`)
    this.http.post<{name:string}>(urlStr, userId).subscribe((res)=>{
      console.log(res)
    })
  }

  findItems(storeId: string, keyword: string, userId: string){
    let urlStr = `http://localhost:3000/targetapi/savetargetitems?storeId=${storeId}&keyword=${keyword}&userId=${userId}`
    console.log(`=======================> urlStr = ${urlStr}`)
    this.http.post<{name:string}>(urlStr, userId).subscribe((res)=>{
      console.log(res)
    })
  }
}
// end of Target Service