import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { ViewCalculatedDataBySelectedComponent } from './components/view-calculated-data-by-selected/view-calculated-data-by-selected.component';


const routes: Routes = [
  {path: '', component: RootComponent},
  { path: 'show-selected', component: ViewCalculatedDataBySelectedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
