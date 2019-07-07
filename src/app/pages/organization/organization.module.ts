import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { TopNavComponent } from './top-nav/top-nav.component';
import { RepositoryComponent } from './repository/repository.component';
import { OrganizationComponent } from './organization/organization.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material';

@NgModule({
  declarations: [
    TopNavComponent,
    RepositoryComponent,
    OrganizationComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule
  ]
})
export class OrganizationModule { }
