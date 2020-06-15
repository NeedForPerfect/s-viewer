import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ItemUI } from 'src/app/core/models/item.model';
import { ItemsState } from 'src/app/core/store/reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items-viewer',
  templateUrl: './items-viewer.component.html',
  styleUrls: ['./items-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsViewerComponent implements OnInit {

  items: ItemUI[] = [];
  loading = false;
  subscribtions = new Subscription();

  constructor(
    private store: Store<{ itemsState: ItemsState }>,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {                                       // TO DO
    this.subscribtions.add(this.store.subscribe(store => { // separate subscribtions for all items and selected and 
                                                           // change state of selected item by ViewChildren and call method.  Do not subscribe store in each item.
      this.items = store.itemsState.items.map( i => {
        if (store.itemsState.selectedItems.some( sI => sI.number === i.number )) {
          return { ...i, selected: true }
        } else {
          return { ...i, selected: false }
        }
      });
      this.loading = store.itemsState.loading;
      this.cd.detectChanges();
    }));
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

}
