import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCardComponent } from './search-card/search-card.component';

const routes: Routes = [
  {
    path: '',
    component: SearchCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
