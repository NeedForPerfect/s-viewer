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

  ngOnInit(): void {
    this.subscribtions.add(this.store.subscribe(({ itemsState }) => {
      this.items = itemsState.items.map(d => ({...d}));
      this.makrSelected(this.items, itemsState.selectedItems);
      this.loading = itemsState.loading;
      this.cd.detectChanges();
    }));

  }

  makrSelected(shownItems, selected) {
    if(shownItems.length) {
      shownItems.forEach( (item: ItemUI, index) => {
        if (selected.some(s => s.number === item.number)) {
          this.items[index] = { ...this.items[index], selected: true };
        } else {
          this.items[index] = { ...this.items[index], selected: false };
        }
        this.cd.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

}
