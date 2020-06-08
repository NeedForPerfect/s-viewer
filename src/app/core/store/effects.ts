import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ApiGetItemsSuccess, ApiGetItems } from './actions';
import { Store } from '@ngrx/store';
import { ItemsState } from './reducer';
import { MockDataService, ItemsRequest, ItemsResponce } from '../services/mock-data.service';

 
@Injectable()
export class ItemsEffects {
 
  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(ApiGetItems()),
    withLatestFrom(this.store.select(state => state.itemsState.itemsQuery)),
    mergeMap((filterValue: [ {request: ItemsRequest} , ItemsRequest]) => {
      const [action, lastFilterValue] = filterValue;
      const request = { ...lastFilterValue, ...action.request };
      return this.mockData.getItems(request)
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