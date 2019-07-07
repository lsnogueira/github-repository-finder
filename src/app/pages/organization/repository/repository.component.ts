import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../../../shared/model/repository.model';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['../../../../assets/scss/components/_repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  @Input() repository: Repository = null;
  unbounded = false;
  constructor() { }

  ngOnInit() {
    console.log(this.repository);
  }

}
