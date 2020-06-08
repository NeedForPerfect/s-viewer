import { Component, OnInit } from '@angular/core';
import { ItemUI } from 'src/app/core/models/item.model';
import { ItemsState } from 'src/app/core/store/reducer';
import { Store } from '@ngrx/store';
import { ApiGetItems } from 'src/app/core/store/actions';
import { Subscription } from 'rxjs';
import { ItemsRequest } from 'src/app/core/services/mock-data.service';



@Component({
  selector: 'app-items-viewer',
  templateUrl: './items-viewer.component.html',
  styleUrls: ['./items-viewer.component.scss']
})
export class ItemsViewerComponent implements OnInit {

  items: ItemUI[] = [];
  loading = false;
  subscribtions = new Subscription();

  constructor(
    private store: Store<{ itemsState: ItemsState }>
  ) { }

  ngOnInit(): void {
    this.subscribtions.add(this.store.subscribe(store => {
      this.items = store.itemsState.items;
      this.loading = store.itemsState.loading;
    }));
    this.store.dispatch(ApiGetItems()({ request: { count: 25, page: 1, itemsType: 'COFFEE' } as ItemsRequest }))
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

}
