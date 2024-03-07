import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchEmitter = new Subject<string>();

  searchObservable = this.searchEmitter.asObservable();

  search(value: string) {
    this.searchEmitter.next(value);
  }
}
