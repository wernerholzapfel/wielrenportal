import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IEtappe} from '../models/etappe.model';
import {map} from 'rxjs/operators';

@Injectable()
export class EtappeService {

  constructor(private http: HttpClient) {
  }

  getEtappes(tourId): Observable<IEtappe[]> {

    return this.http.get<IEtappe[]>(`${environment.apiBaseUrl}/etappes/tour/${tourId}`);
  }

  saveEtappe(body: IEtappe): Observable<IEtappe> {
    return this.http.post<IEtappe>(`${environment.apiBaseUrl}/etappes`, body)
      .pipe(map(res => <IEtappe>res));
  }
}
