import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private url: string = AppConstants.urlPath + 'technology/';

  constructor(private http: HttpClient) { }

  listarTechnologies(): Observable<any> {
    return this.http.get(this.url);
  }

  inserirTechnology(technology: any): Observable<any> {
    return this.http.post(this.url, technology);
  }

  atualizarTechnology(technology: any): Observable<any> {
    return this.http.put(this.url, technology);
  }

  deleteTechnology(id: number): Observable<any> {
    return this.http.delete(this.url + id, {responseType: 'text'});
  }

  localizarTechnology(id?: string): Observable<any> {
    return this.http.get(this.url + id);
  }

}
