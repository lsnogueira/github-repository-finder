import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../../shared/service/github.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['../../../../assets/scss/components/_commit-list.component.scss']
})
export class CommitListComponent implements OnInit, OnDestroy {
  private orgName: string;
  private repoName: string;
  private subscription = new Subscription();

  constructor(
    private ghService: GithubService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.repoName = this.activatedRoute.snapshot.params.repo;

    this.subscription.add(
      this.activatedRoute.parent.params
        .subscribe(res => {
          this.orgName = res.org;
        })
    );

    this.ghService
      .getCommits(this.orgName, this.repoName)
      .then(res => {
        console.log(res);
      })
      .catch(rej => {
        console.log('af', rej);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
