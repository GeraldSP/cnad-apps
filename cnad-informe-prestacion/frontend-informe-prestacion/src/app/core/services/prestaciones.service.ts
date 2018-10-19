import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Prestacion } from '../models/Prestacion.model';

//const API_URL = environment.apiUrl + '/prestaciones/';
const API_URL = '/api/prestaciones/';

@Injectable()
export class PrestacionesService {

  constructor(private http: Http) { }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  getPrestaciones(): Observable<Prestacion[]> {
    return this.http
    .get(API_URL)
    .map(response => {
      const prestaciones = response.json();
      return prestaciones.map((prestacion) => new Prestacion(prestacion));
    })
    .catch(this.handleError);
  }

  getPrestacion(id: number): Observable<Prestacion> {
    return this.http
    .get(API_URL + id)
    .map(response => {
      return new Prestacion(response.json());
    })
    .catch(this.handleError);
  }

  persist(prestacion: Prestacion): Observable<Prestacion> {
    return this.http
    .post(API_URL, prestacion)
    .map(response => {
      return new Prestacion(response.json());
    })
    .catch(this.handleError);
  }

  update(prestacion: Prestacion): Observable<Prestacion> {
    return this.http
    .put(API_URL + prestacion.id, prestacion)
    .map(response => {
      return new Prestacion(response.json());
    })
    .catch(this.handleError);
  }

  delete(id: number): Observable<boolean> {
    return this.http
    .delete(API_URL + id)
    .map(response => true)
    .catch(this.handleError);
  }
}
