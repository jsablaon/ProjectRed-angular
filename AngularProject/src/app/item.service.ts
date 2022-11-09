import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Item} from './item';
import {TargetItem} from './target-items'

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
    //console.log("item.id");
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
