import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<any> {
    return this.http.get(AppConstants.urlUser);
  }

  inserirUsuario(user: any): Observable<any> {
    return this.http.post(AppConstants.urlUser, user);
  }

  atualizarUsuario(user: any): Observable<any> {
    return this.http.put(AppConstants.urlUser, user);
  }

  excluirUsuario(id: string): Observable<any> {
    return this.http.delete(AppConstants.urlUser + id, {responseType: 'text'});
  }

  localizarUsuario(id: string): Observable<any> {
    return this.http.get(AppConstants.urlUser + id);
  }

}
