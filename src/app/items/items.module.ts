import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { RootComponent } from './components/root/root.component';
import { FilterComponent } from './components/filter/filter.component';
import { ItemsViewerComponent } from './components/items-viewer/items-viewer.component';
import { ItemComponent } from './components/item/item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewCalculatedDataBySelectedComponent } from './components/view-calculated-data-by-selected/view-calculated-data-by-selected.component';
import {MatButtonModule} from '@angular/material/button';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { SecondMapChartComponent } from './components/second-map-chart/second-map-chart.component';


@NgModule({
  declarations: [RootComponent, FilterComponent, ItemsViewerComponent, ItemComponent, ViewCalculatedDataBySelectedComponent, SecondMapChartComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxEchartsModule.forRoot({
      echarts
    })
  ]
})
export class ItemsModule { }
