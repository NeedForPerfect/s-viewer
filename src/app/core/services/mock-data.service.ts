import { Injectable } from '@angular/core';
import { mockData } from './mock-data';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CoffeItem } from '../models/item.model';

export interface ItemsResponce<T> {
  items: T[];
  totalCount: number;
  count: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getCoffeeItems(count: number = 10, page: number = 1, itemsType: string = 'COFFEE'): Observable<ItemsResponce<CoffeItem>> {
    return of(mockData[itemsType]).pipe(map((items: CoffeItem[]) => {
      const to = count * page;
      const from = to - count;
      const totalCount = items.length;
      return {
        items: items.slice(from, to),
        totalCount,
        count,
        page
      };
    }), delay(1500));
  }

}
