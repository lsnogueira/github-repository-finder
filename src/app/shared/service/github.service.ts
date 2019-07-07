import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Repository } from '../model/repository.model';
import { Observable } from 'rxjs';
import { Organization } from '../model/organization.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly URI = 'https://api.github.com';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  });

  constructor(private http: HttpClient) {}

  getRepositories(org: string): Observable<Repository> {
    return this.http
      .get<Repository>(
        `${this.URI}/orgs/${org}/repos?type=public`, { headers: this.headers }
      );
  }

  getOrganization(org: string): Observable<Organization> {
    return this.http
      .get<Organization>(`${this.URI}/orgs/${org}`, { headers: this.headers });
  }

}
