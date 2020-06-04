import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { RootComponent } from './components/root/root.component';
import { FilterComponent } from './components/filter/filter.component';
import { ItemsViewerComponent } from './components/items-viewer/items-viewer.component';
import { ItemComponent } from './components/item/item.component';


@NgModule({
  declarations: [RootComponent, FilterComponent, ItemsViewerComponent, ItemComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule { }
