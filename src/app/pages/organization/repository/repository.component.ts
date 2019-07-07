import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../../../shared/model/repository.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GithubService } from '../../../shared/service/github.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../../shared/service/snackbar.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['../../../../assets/scss/components/_repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  repositories: Repository[];

  private orgName: string;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private ghService: GithubService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.orgName = this.activatedRoute.snapshot.params.org;

    this.subscription.add(
      this.ghService.getRepositories(this.orgName)
        .subscribe(
          res => {
            this.repositories = res;
          },
          () => {
            this.snackBarService.open(
              'Não foi possível carregar os repositórios'
            );
          }
        )
    );
  }

  goList(): void {}
}
