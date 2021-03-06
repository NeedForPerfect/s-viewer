import { Injectable } from '@angular/core';
import { mockData } from './mock-data';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ItemUI } from '../models/item.model';

export interface ItemsResponce<T> {
  items: T[];
  total: number;
  count: number;
  page: number;
}

export interface ItemsRequest {
  page?: number;
  count?: number;
  itemsType?: string;
  countries?: string[];
  ports?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getItems(itemsRequest: ItemsRequest): Observable<ItemsResponce<ItemUI>> {
    const { count, page, itemsType, countries } = itemsRequest;
    return of(mockData[itemsType]).pipe(map((items: ItemUI[]) => {
      if (countries.length) {
        return items.filter(i => countries.some(c => c.toLowerCase() === i.origin.toLowerCase()));
      } else {
        return items;
      }
    }), map((items: ItemUI[]) => {
      const to = count * page;
      const from = to - count;
      const total = items.length;
      let itemsUI = items.slice(from, to);
      if (itemsRequest.itemsType === 'COCOA') {
        itemsUI = items.map(i => ({ ...i, netWeightLBS: i.netWeightKG }));
      }
      itemsUI = itemsUI.map(i => ({ ...i, netWeightLBS: (+i.netWeightLBS.replace(',', '').replace('.', '') / 1000).toFixed(2) }));
      return {
        items: itemsUI,
        total,
        count,
        page
      };
    }), delay(300));
  }

}
