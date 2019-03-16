import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRider} from '../models/rider.model';
import {environment} from '../../environments/environment';
import {ITourrider} from '../models/etappe.model';

@Injectable()
export class RiderService {

  constructor(private http: HttpClient) {
  }

  getRiders(): Observable<IRider[]> {

    return this.http.get<IRider[]>(`${environment.apiBaseUrl}/riders`);
  }

  getDetailTourriders(tourId: string): Observable<IRider[]> {
    return this.http.get<IRider[]>(`${environment.apiBaseUrl}/tourriders/details/` + tourId);
  }


  getTourriderDetails(tourriderId: string): Observable<ITourrider> {
    return this.http.get<ITourrider>(`${environment.apiBaseUrl}/participants/rider/` + tourriderId);

  }
}
