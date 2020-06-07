import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Store } from '@ngrx/store';
import { ItemsState } from 'src/app/core/store/reducer';
import { ApiGetItems } from 'src/app/core/store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  subscribtions = new Subscription();
  totalItems: number = 0;
  itemsPerPage: number = 48;

  constructor(
    private store: Store<{ itemsState: ItemsState }> 
  ) { }

  ngOnInit(): void {
    this.subscribtions.add(this.store.subscribe( (state: { itemsState: ItemsState }) => {
      this.totalItems = state.itemsState.totalItems;
      this.itemsPerPage = state.itemsState.itemsPerPage;
    }));
  }

  onPage(page: PageEvent) {
    this.store.dispatch(ApiGetItems()({request: { count: 48, page: page.pageIndex }}))
  }

}
