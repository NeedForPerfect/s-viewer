import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsRoutingModule } from './deals-routing.module';
import { RootComponent } from './components/root/root.component';


@NgModule({
  declarations: [RootComponent],
  imports: [
    CommonModule,
    DealsRoutingModule
  ]
})
export class DealsModule { }
