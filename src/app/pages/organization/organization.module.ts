import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { TopNavComponent } from './top-nav/top-nav.component';
import { RepositoryComponent } from './repository/repository.component';
import { OrganizationComponent } from './organization/organization.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule, MatButtonModule } from '@angular/material';
import { CommitListComponent } from './commit-list/commit-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TopNavComponent,
    RepositoryComponent,
    OrganizationComponent,
    CommitListComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatExpansionModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrganizationModule {}
