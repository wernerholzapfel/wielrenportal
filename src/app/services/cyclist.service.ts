import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ICyclist} from '../models/cyclist.model';
import {environment} from '../../environments/environment';

@Injectable()
export class CyclistService {

  constructor(private http: HttpClient) { }

  getCyclists(): Observable<ICyclist[]> {

    return this.http.get<ICyclist[]>(`${environment.apiBaseUrl}/cyclists`);
  }
}
