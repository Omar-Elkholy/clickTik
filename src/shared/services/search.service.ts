import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTxt$ = new BehaviorSubject<string>('');
  
  constructor() { }
}
