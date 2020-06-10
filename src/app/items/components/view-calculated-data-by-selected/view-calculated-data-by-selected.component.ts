import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItemsState } from 'src/app/core/store/reducer';
import { ItemUI } from 'src/app/core/models/item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-calculated-data-by-selected',
  templateUrl: './view-calculated-data-by-selected.component.html',
  styleUrls: ['./view-calculated-data-by-selected.component.scss']
})
export class ViewCalculatedDataBySelectedComponent implements OnInit {

  selectedItems: ItemUI[];
  subscribtions = new Subscription();

  constructor(
    private store: Store<{ itemsState: ItemsState }>
  ) { }

  ngOnInit(): void {
    this.subscribtions.add(this.store.subscribe(({ itemsState }: { itemsState: ItemsState }) => {
      this.selectedItems = itemsState.selectedItems;
    }));
  }

}
