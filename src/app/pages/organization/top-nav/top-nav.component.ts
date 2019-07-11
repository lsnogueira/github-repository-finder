import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../../shared/service/github.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../shared/service/snackbar.service';
import { ErrorMessages } from '../../../shared/enum/errors.enum';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['../../../../assets/scss/components/_top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  constructor(
    private ghService: GithubService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {}

  onSearch(searchValue: string): void {
    if (searchValue) {
      this.ghService.getOrganization(searchValue).subscribe(
        res => {
          this.router.navigate([`${res.login}`])
            .then(() => {
              location.reload();
            })
            .catch(() => {
              this.snackBarService.open(ErrorMessages.LOAD_ORG);
            });
        },
        rej => {
          if (rej.status === 404) {
            this.snackBarService.open(ErrorMessages.NOT_FOUND_ORG);
            return;
          }
          this.snackBarService.open(ErrorMessages.UNEXPECTED_ERROR);
        }
      );
    }
  }
}
