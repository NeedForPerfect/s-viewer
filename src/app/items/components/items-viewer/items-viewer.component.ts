import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ItemUI } from 'src/app/core/models/item.model';
import { ItemsState } from 'src/app/core/store/reducer';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getSelected, getShownItems } from 'src/app/core/store/selectors';
import { filter, withLatestFrom } from 'rxjs/operators';

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
    this.subscribtions.add(this.store.pipe(
      select(getShownItems()),
      filter(items => items.length),
      withLatestFrom(this.store.pipe(select(getSelected())))
    ).subscribe(([shownItems, selectedItems]) => {
      this.items = shownItems.map(d => ({ ...d }));
      this.loading = shownItems.loading;
      this.cd.detectChanges();

      // const countriesByPorts = itemsState.selectedItems.reduce((acc: { [key: string]: string[] }, i: ItemUI) => {
      //   if (!acc[i.origin]) {
      //     return { ...acc, [i.origin]: [i.port] };
      //   } else if (!acc[i.origin].some(c => c === i.port)) {
      //     acc[i.origin].push(i.port);
      //     return acc;
      //   } else {
      //     return acc;
      //   }
      // }, {});

      // console.log(countriesByPorts);

    }));

  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

}
