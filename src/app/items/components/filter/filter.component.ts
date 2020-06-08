import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Store } from '@ngrx/store';
import { ItemsState } from 'src/app/core/store/reducer';
import { ApiGetItems } from 'src/app/core/store/actions';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ItemsRequest } from 'src/app/core/services/mock-data.service';

export interface FilterFormValue {
  countries: string[],
  ports: string[],
  itemsType: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  subscribtions = new Subscription();
  totalItems: number = 0;
  itemsPerPage: number = 25;
  currentPageIndex: number = 0;
  filterForm: FormGroup;
  lastItemsType: string;

  itemTypes = [
    'COFFEE',
    'COCOA'
  ];

  constructor(
    private store: Store<{ itemsState: ItemsState }>,
    private fb: FormBuilder
  ) { }

  initFilterForm() {
    this.filterForm = this.fb.group({
      countries: [],
      ports: [],
      itemsType: ''
    });
    this.subscribtions.add(this.filterForm.valueChanges.subscribe((val: FilterFormValue) => {
      if (this.lastItemsType !== val.itemsType) {
        this.onFilterItems(val, true);
      }
    }));
  }

  onFilterItems(filterValue: FilterFormValue, resetPaginator = false) {
    let request: ItemsRequest = { itemsType: filterValue.itemsType }; // make form values the same with itemsQuery in STORE
    if (resetPaginator) {
      request.page = 1;
      this.currentPageIndex = 0;
      request.count = this.itemsPerPage; 
    }
    this.store.dispatch(ApiGetItems()({ request }))
  }

  onPage(page: PageEvent) {
    this.currentPageIndex = page.pageIndex;
    this.store.dispatch(ApiGetItems()({ request: { count: this.itemsPerPage, page: (page.pageIndex + 1) } }))
  }

  ngOnInit(): void {
    this.subscribtions.add(this.store.subscribe((state: { itemsState: ItemsState }) => {
      if (state.itemsState.itemsQuery) {
        this.totalItems = state.itemsState.total;
        this.itemsPerPage = state.itemsState.itemsQuery.count;
      }
    }));
    this.initFilterForm();
  }

}
