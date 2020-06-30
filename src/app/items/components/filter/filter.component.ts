import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Store } from '@ngrx/store';
import { ItemsState } from 'src/app/core/store/reducer';
import { ApiGetItems, MultipleSelectAddItems } from 'src/app/core/store/actions';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ItemsRequest } from 'src/app/core/services/mock-data.service';
import { ItemUI } from 'src/app/core/models/item.model';

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

  totalSelectedItems: number = 0;
  totalTonage: number = 0;

  itemTypes = [
    'COFFEE',
    'COCOA'
  ];

  countries = [
    'COLOMBIA',
    'GUATEMALA',
    'VIETNAM',
    'PERU',
    'UGANDA',
    'MEXICO',
    'OS_BRAZIL'
  ]

  constructor(
    private store: Store<{ itemsState: ItemsState }>,
    private fb: FormBuilder
  ) { }

  initFilterForm() {
    this.filterForm = this.fb.group({
      countries: '',
      ports: [],
      itemsType: 'COFFEE'
    });
    this.subscribtions.add(this.filterForm.valueChanges.subscribe((val: FilterFormValue) => {
        this.onFilterItems(val);
    }));
    this.subscribtions.add(
      this.store.select(state => state.itemsState.itemsQuery).subscribe((itemsRequest: ItemsRequest) => {
        this.filterForm.patchValue({
          countries: itemsRequest.countries
        }, {emitEvent: false})
      })
    )
  }

  selectAll() {
    this.store.dispatch(MultipleSelectAddItems()());
  }

  onFilterItems(filterValue: FilterFormValue) {
    let request: ItemsRequest = { ...filterValue };
    request.page = 1;
    this.currentPageIndex = 0;
    request.count = this.itemsPerPage; 
    this.store.dispatch(ApiGetItems()({ request }))
  }

  onPage(page: PageEvent) {
    this.currentPageIndex = page.pageIndex;
    this.store.dispatch(ApiGetItems()({ request: { count: this.itemsPerPage, page: (page.pageIndex + 1) } }))
  }

  ngOnInit(): void {
    this.subscribtions.add(this.store.subscribe((state: { itemsState: ItemsState }) => {
      if (state.itemsState.itemsQuery) {
        this.currentPageIndex = state.itemsState.itemsQuery.page - 1;
        this.totalItems = state.itemsState.total;
        this.itemsPerPage = state.itemsState.itemsQuery.count;
      }
      if (state.itemsState.selectedItems.length) {
        this.totalSelectedItems = state.itemsState.selectedItems.length;
        const totalTonage = state.itemsState.selectedItems.reduce((acc: number, curr: ItemUI) => {
          return acc + +curr.netWeightLBS;
        }, 0)
        this.totalTonage = +totalTonage.toFixed(3);
      } else {
        this.totalSelectedItems = 0;
        this.totalTonage = 0;
      }
    }));
    this.store.dispatch(ApiGetItems()({ request: { } }));
    // this will get items by latest params
    this.initFilterForm();
  }

}
