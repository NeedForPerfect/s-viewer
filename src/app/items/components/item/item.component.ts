import { Component, OnInit, Input } from '@angular/core';
import { ItemUI } from 'src/app/core/models/item.model';
import { Store } from '@ngrx/store';
import { ItemsState } from 'src/app/core/store/reducer';
import { SelectAddItem, SelectRemoveItem } from 'src/app/core/store/actions';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input('item') item: ItemUI;
  @Input('selectedMode') selectedMode: boolean = false;

  constructor(
    private store: Store<{ itemsState: ItemsState }>
  ) { }

  ngOnInit(): void {
  }

  onChangeCheckbox(event: MatCheckboxChange) {
    if (event.checked) {
      this.addItem();  
    } else {
      this.removeItem();
    }
  }

  addItem() {
    this.store.dispatch(SelectAddItem()({item: this.item}));
  }

  removeItem() {
    this.store.dispatch(SelectRemoveItem()({item: this.item}));
  }

}
