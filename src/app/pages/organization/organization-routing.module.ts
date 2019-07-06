import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { RepositoryComponent } from './repository/repository.component';
import { TopNavComponent } from './top-nav/top-nav.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      { path: '', component: TopNavComponent },
      { path: '', component: RepositoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
