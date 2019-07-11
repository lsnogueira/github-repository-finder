import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchModule } from '../search.module';
import { SnackbarService } from '../../../shared/service/snackbar.service';
import { GithubService } from '../../../shared/service/github.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchCardComponent } from './search-card.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SearchCardComponente configuration', () => {

  beforeAll(done =>
    (async () => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([]),
          SearchModule
        ],
        providers: [SnackbarService, GithubService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      });
    })()
      .then(done)
      .catch(done.fail)
  );

  describe('SearchCardComponent', () => {
    let component: SearchCardComponent;
    let snackbarService: SnackbarService;
    let ghService: GithubService;
    let router: Router;

    beforeAll(done =>
      (async () => {
        component = TestBed.createComponent(SearchCardComponent)
          .componentInstance;
        snackbarService = TestBed.get(SnackbarService);
        ghService = TestBed.get(GithubService);
        router = TestBed.get(Router);
      })()
        .then(done)
        .catch(done.fail)
    );

    beforeEach(done =>
      (async () => {
        component.ngOnInit();
      })()
        .then(done)
        .catch(done.fail)
    );

    it('should be created', done =>
      (async () => {
        expect(component).toBeDefined();
      })()
        .then(done)
        .catch(done.fail));

    it('should navigate to grupy-sp', done =>
      (async () => {
        component.formSearch.patchValue({ searchInput: 'grupy-sp' });
        const navigateGrupySp = spyOn(router, 'navigate');

        spyOn(ghService, 'getOrganization').and.returnValue(
          of({ login: 'grupy-sp' })
        ); // Mock de parametro
        component.onSearch();

        expect(navigateGrupySp).toHaveBeenCalledWith([
          component.form.searchInput.value
        ]);
      })()
        .then(done)
        .catch(done.fail));

    it('should get not found error', done =>
      (async () => {
        component.formSearch.patchValue({
          searchInput: 'alsdjfljgklhjafghljdretur'
        });

        spyOn(ghService, 'getOrganization').and.returnValue(
          throwError({ status: 404 })
        );
        const snackSpy = spyOn(snackbarService, 'open');
        component.onSearch();
        expect(component.submitted).toBeFalsy();
        expect(snackSpy).toHaveBeenCalledWith('Organização não encontrada');
      })()
        .then(done)
        .catch(done.fail));
  });
});
