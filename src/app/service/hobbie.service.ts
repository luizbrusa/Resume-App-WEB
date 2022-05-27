import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class HobbieService {

  private url: string = AppConstants.urlPath + 'hobbie/';

  constructor(private http: HttpClient) { }

  listarHobbies(): Observable<any> {
    return this.http.get(this.url);
  }

  inserirHobbie(hobbie: any): Observable<any> {
    return this.http.post(this.url, hobbie);
  }

  atualizarHobbie(hobbie: any): Observable<any> {
    return this.http.put(this.url, hobbie);
  }

  deleteHobbie(id: number): Observable<any> {
    return this.http.delete(this.url + id, {responseType: 'text'});
  }

  localizarHobbie(id?: string): Observable<any> {
    return this.http.get(this.url + id);
  }

}
