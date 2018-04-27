import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {ITour} from '../models/tour.model';

@Injectable()
export class TourService {

  constructor(private http: HttpClient) {
  }

  getTour(): Observable<ITour> {
    return this.http.get<ITour>(`${environment.apiBaseUrl}/tours`);
  }
}
