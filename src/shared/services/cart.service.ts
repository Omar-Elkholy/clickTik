import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productsInCart$ = new BehaviorSubject<number>(0);

  constructor() { }
}
