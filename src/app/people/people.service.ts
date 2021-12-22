import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class PeopleService {
  constructor() { }

  getPeople(): Observable<any> {
    return of([
      {
        id: 1,
        name: 'Juri',
        surname: 'Strumpflohner',
        twitter: '@juristr'
      }
    ]);
  }
}
