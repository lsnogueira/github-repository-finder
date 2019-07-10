import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../../shared/service/github.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Organization } from '../../../shared/model/organization.model';
import { Repository } from '../../../shared/model/repository.model';
import { SnackbarService } from '../../../shared/service/snackbar.service';
import { ErrorMessages } from '../../../shared/enum/errors.enum';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['../../../../assets/scss/components/_organization.component.scss']
})
export class OrganizationComponent implements OnInit, OnDestroy {
  isPageLoad: boolean;
  org: Organization;
  repos: Repository;

  private subscription = new Subscription();

  constructor(
    private ghService: GithubService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.initListener();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initListener(): void {
    const orgName = this.activatedRoute.snapshot.params.org;

    this.subscription.add(
      this.ghService.getOrganization(orgName)
        .subscribe(res => {
          this.org = res;
          this.isPageLoad = true;
        },
        () => {
          this.snackBarService.open(ErrorMessages.UNEXPECTED_ERROR);
        })
    );
  }
}
