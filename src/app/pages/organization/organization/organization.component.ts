import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../../shared/service/github.service';
import { Subscription, forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Organization } from '../../../shared/model/organization.model';
import { Repository } from '../../../shared/model/repository.model';

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const orgName = this.activatedRoute.snapshot.params.org;
    const orgRequest = this.ghService.getOrganization(orgName);
    const reposRequest = this.ghService.getRepositories(orgName);

    forkJoin([orgRequest, reposRequest])
      .subscribe(res => {
        this.org = res[0];
        this.repos = res[1];
        console.log('org', this.org);
        console.log('repos', this.repos);
        this.isPageLoad = true;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
