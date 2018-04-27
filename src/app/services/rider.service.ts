import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IRider} from '../models/rider.model';
import {environment} from '../../environments/environment';

@Injectable()
export class RiderService {

  constructor(private http: HttpClient) { }

  getRiders(): Observable<IRider[]> {

    return this.http.get<IRider[]>(`${environment.apiBaseUrl}/riders`);
  }
}
