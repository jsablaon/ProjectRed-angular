import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Item} from './item';
import {TargetItem} from './item'
import {TargetStore} from './item'


import {ITEMS} from './mock-items';

import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({ providedIn: 'root' })


export class ItemService {

  constructor( private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:3000/items');
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

  getItems(): Observable<TargetItem[]> {
    //TODO: parse userid and storeid
    return this.http.get<TargetItem[]>('http://localhost:3000/targetapi/getitems?userId=3&storeId=1122');
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
  getStores(): Observable<TargetStore[]> {
    //TODO: parse userid and storeid
    return this.http.get<TargetStore[]>('http://localhost:3000/targetapi/getstores?userId=1&zip=98007');
  }
}
// end of Target Service