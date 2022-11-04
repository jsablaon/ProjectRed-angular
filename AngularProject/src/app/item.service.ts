import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Item} from './item';
import {ITEMS} from './mock-items';

@Injectable({ providedIn: 'root' })
export class ItemService {

  constructor() { }
  getItems(): Observable<Item[]> {
    const items = of(ITEMS);
    return items;
  }
  getItem(id: number): Observable<Item>{
    const item = ITEMS.find(h => h.id === id)!;
    return of(item);
  }
}
