import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ApiGetItemsSuccess, ApiGetItems } from './actions';
import { Store } from '@ngrx/store';
import { ItemsState } from './reducer';
import { MockDataService, ItemsRequest, ItemsResponce } from '../services/mock-data.service';

 
@Injectable()
export class ItemsEffects {
 
  loadSuppliers$ = createEffect(() => this.actions$.pipe(
    ofType(ApiGetItems()),
    mergeMap((action: { request: ItemsRequest }) => {
			const {page, count} = action.request;
      return this.mockData.getCoffeeItems(count, page)
      .pipe(
        map( (res: ItemsResponce<any>) => { 
          return ApiGetItemsSuccess()({ responce: res })
         }),
       // catchError(() => of(ApiError()()))
      )
    })
    )
  );
 
  constructor(
    private actions$: Actions,
    private mockData: MockDataService,
    private store: Store<{itemsState: ItemsState}>
  ) {}
}