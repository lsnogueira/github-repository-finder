import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../../../shared/service/github.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../shared/service/snackbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fadeStateTrigger } from '../../../shared/animations';
import { ErrorMessages } from '../../../shared/enum/errors.enum';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['../../../../assets/scss/components/_search-card.component.scss'],
  animations: [fadeStateTrigger]
})
export class SearchCardComponent implements OnInit, OnDestroy {
  submitted: boolean;
  formSearch: FormGroup;
  loaded = false;

  private subscription = new Subscription();

  constructor(
    private ghService: GithubService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.submitted = false;
    setTimeout(() => {
      this.loaded = true;
    }, 500);
    this.formSearch = new FormGroup({
      searchInput: new FormControl(null, { validators: [Validators.required] })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get form() {
    return this.formSearch.controls;
  }

  onSearch(): void {
    const org = this.form.searchInput.value;

    if (org && !this.submitted) {
      this.submitted = true;
      this.ghService.getOrganization(org).subscribe(
        res => {
          this.router.navigate([`${res.login}`]);
        },
        rej => {
          this.submitted = false;
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
