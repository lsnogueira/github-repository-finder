import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { RepositoryComponent } from './repository/repository.component';
import { CommitListComponent } from './commit-list/commit-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      { path: '', component: RepositoryComponent },
      { path: ':repo', component: CommitListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
