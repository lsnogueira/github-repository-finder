import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../../shared/service/github.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../../shared/service/snackbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Branch } from '../../../shared/model/branch.model';
import { Commit } from '../../../shared/model/commit.model';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['../../../../assets/scss/components/_commit-list.component.scss']
})
export class CommitListComponent implements OnInit, OnDestroy {
  formAuthor: FormGroup;
  branches: Branch[];
  commits: Commit[];
  titleLength: number;
  pages = {};

  private orgName: string;
  private repoName: string;
  private linkHeaders: string;
  private subscription = new Subscription();
  private linkPages: any;

  constructor(
    private ghService: GithubService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.formAuthor = new FormGroup({
      authorInput: new FormControl(null, {
        validators: [Validators.minLength(3)]
      })
    });
    this.repoName = this.activatedRoute.snapshot.params.repo;
    this.titleLength = 40;
    this.initListeners();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchAuthor(): void {}

  initListeners() {
    this.subscription.add(
      this.activatedRoute.parent.params.subscribe(res => {
        this.orgName = res.org;
      })
    );

    this.subscription.add(
      this.ghService.getBranches(this.orgName, this.repoName).subscribe(
        res => {
          this.branches = [...res];
        },
        () => {
          this.snackBarService.open('Não foi possível carregar as branches');
        }
      )
    );

    this.subscription.add(
      this.ghService.getCommits(this.orgName, this.repoName).subscribe(
        res => {
          this.commits = res.body;
          this.linkHeaders = res.headers.get('Link');
          this.pages = this.getNumberPages(this.linkHeaders);
          this.linkPages = this.getLinkPages(this.linkHeaders);
        },
        rej => {
          console.log('af', rej);
        }
      )
    );
  }

  changePage() {
    this.subscription.add(
      this.ghService.getNewCommitPage(this.linkPages.next).subscribe(
        res => {
          console.log(res.body);
          this.commits = res.body;
          this.linkHeaders = res.headers.get('Link');
          this.pages = this.getNumberPages(this.linkHeaders);
          this.linkPages = this.getLinkPages(this.linkHeaders);
        },
        rej => {
          console.log('af', rej);
        }
      )
    );
    window.scroll(0, 0);
  }

  changeBranch(branch: string) {
    this.subscription.add(
      this.ghService.getCommits(this.orgName, this.repoName, branch).subscribe(
        res => {
          this.commits = res.body;
          this.linkHeaders = res.headers.get('Link');
          this.pages = this.getNumberPages(this.linkHeaders);
          this.linkPages = this.getLinkPages(this.linkHeaders);
        },
        rej => {
          console.log('af', rej);
        }
      )
    );
  }

  private getNumberPages(header: string): Object {
    const pages = header.split(',').reduce((prev, curr) => {
      const match = curr.match(/&page=(.*)>; rel="(\w*)"/);
      const number = Number(match[1]);
      const rel = match[2];
      prev[rel] = number;
      return prev;
    }, {});
    return pages;
  }

  private getLinkPages(header: string): Object {
    const pages = header.split(',').reduce((prev, curr) => {
      const match = curr.match(/<(.*)>; rel="(\w*)"/);
      const url = match[1];
      const rel = match[2];
      prev[rel] = url;
      return prev;
    }, {});
    return pages;
  }
}
