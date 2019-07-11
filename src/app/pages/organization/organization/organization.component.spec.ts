import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';
import { GithubService } from '../../../shared/service/github.service';
import { SnackbarService } from '../../../shared/service/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { Organization } from '../../../shared/model/organization.model';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let ghService: GithubService;
  let snackBarService: SnackbarService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    ghService = new GithubService(null);
    snackBarService = new SnackbarService(null);
    activatedRoute = new ActivatedRoute();
    component = new OrganizationComponent(
      ghService,
      activatedRoute,
      snackBarService
    );
  }));

  afterAll(async(() => {
    component.ngOnDestroy();
  }));

  it('should create', () => {
    const org: Organization = {
      login: 'zazcar',
      id: 123456,
      avatar_url: 'lalalalala',
      name: 'Zazcar',
      public_repos: 2,
      html_url: 'test123test'
    };
    spyOn(ghService, 'getOrganization').and.callFake(() => {
      return from([org]);
    });

    component.ngOnInit();
    expect(component.org).toBe(org);
    expect(component.isPageLoad).toBeTruthy();
  });
});
