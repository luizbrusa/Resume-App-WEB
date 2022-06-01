import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {

  private url: string = AppConstants.urlPath + 'internationalization/';

  constructor(private http: HttpClient) { }

  listarInternationalizations(): Observable<any> {
    return this.http.get(this.url);
  }

  inserirInternationalization(internationalization: any): Observable<any> {
    return this.http.post(this.url, internationalization);
  }

  atualizarInternationalization(internationalization: any): Observable<any> {
    return this.http.put(this.url, internationalization);
  }

  deleteInternationalization(id: number): Observable<any> {
    return this.http.delete(this.url + id, {responseType: 'text'});
  }

  localizarInternationalization(id?: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  listarInternationalizationsPessoa(idPessoa: string): Observable<any> {
    return this.http.get(this.url + 'pessoa/' + idPessoa);
  }

}
