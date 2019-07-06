import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { GithubService } from '../../../shared/service/github.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Organization } from '../../../shared/model/organization.model';
import { SnackbarService } from '../../../shared/service/snackbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['../../../../assets/scss/components/_search-card.component.scss']
})
export class SearchCardComponent implements OnInit, OnDestroy {
  @Output() organization = new EventEmitter<Organization>();

  submitted: boolean;
  formSearch: FormGroup;

  private subscription = new Subscription();

  constructor(
    private ghService: GithubService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.submitted = false;
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

    if (org) {
      this.submitted = true;
      this.ghService
        .getOrganization(org)
        .then(res => {
          this.router.navigate([`${res.login}`]);
          this.organization.emit(res);
        })
        .catch(rej => {
          this.submitted = false;
          if (rej.status === 404) {
            this.snackBarService.open('Organização não encontrada :(');
            return;
          }
          this.snackBarService.open('Um erro inesperado aconteceu');
        });
    }
  }
}
