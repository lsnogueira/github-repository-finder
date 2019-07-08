import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Repository } from '../model/repository.model';
import { Observable } from 'rxjs';
import { Organization } from '../model/organization.model';
import { Commit } from '../model/commit.model';
import { Branch } from '../model/branch.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly URI = 'https://api.github.com';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json'
  });

  constructor(private http: HttpClient) {}

  getRepositories(org: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(
      `${this.URI}/orgs/${org}/repos?type=public`,
      { headers: this.headers }
    );
  }

  getOrganization(org: string): Observable<Organization> {
    return this.http.get<Organization>(`${this.URI}/orgs/${org}`, {
      headers: this.headers
    });
  }

  getCommits(owner: string, repo: string, branch = 'master'): Observable<HttpResponse<Commit[]>> {
    return this.http
      .get<Commit[]>(
        `${this.URI}/repos/${owner}/${repo}/commits?sha=${branch}`, {
          observe: 'response'
      });
  }

  getBranches(owner: string, repo: string): Observable<HttpResponse<Branch[]>> {
    return this.http
      .get<Branch[]>(
        `${this.URI}/repos/${owner}/${repo}/branches`, {
          observe: 'response'
      });
  }
}
