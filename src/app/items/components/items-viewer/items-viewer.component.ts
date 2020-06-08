import { Component, OnInit } from '@angular/core';
import { ItemUI } from 'src/app/core/models/item.model';
import { ItemsState } from 'src/app/core/store/reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';



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
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

}
