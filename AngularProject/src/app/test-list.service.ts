import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gift } from './gift';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TestListService {

  constructor(
    private http: HttpClient) { }

    getGifts(): Observable<Gift[]> {
      return this.http.get<Gift[]>('http://localhost:3000/gifts')
    }
}
