import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../../shared/service/github.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../../shared/service/snackbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['../../../../assets/scss/components/_commit-list.component.scss']
})
export class CommitListComponent implements OnInit, OnDestroy {
  formAuthor: FormGroup;

  private orgName: string;
  private repoName: string;
  private subscription = new Subscription();

  constructor(
    private ghService: GithubService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.formAuthor = new FormGroup({
      authorInput: new FormControl(null, { validators: [Validators.minLength(3)] })
    });

    this.repoName = this.activatedRoute.snapshot.params.repo;

    this.subscription.add(
      this.activatedRoute.parent.params.subscribe(res => {
        this.orgName = res.org;
      })
    );

      //Do a fork join here

    this.ghService
    .getCommits(this.orgName, this.repoName)
    .subscribe(
      res => {
        console.log('commit response', res.body);
        console.log('commit header', res.headers.get('Link'));
      },
      rej => {
        console.log('af', rej);
      }
    );

    this.ghService
      .getBranches(this.orgName, this.repoName)
      .subscribe(
        res => {
          console.log('commit response', res.body);
          console.log('commit header', res.headers.get('Link'));
        },
        rej => {
          console.log('af', rej);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchAuthor(): void {}
}
