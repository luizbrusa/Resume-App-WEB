import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private url: string = AppConstants.urlPath + 'experience/';

  constructor(private http: HttpClient) { }

  listarExperiences(): Observable<any> {
    return this.http.get(this.url);
  }

  inserirExperience(experience: any): Observable<any> {
    return this.http.post(this.url, experience);
  }

  atualizarExperience(experience: any): Observable<any> {
    return this.http.put(this.url, experience);
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(this.url + id, {responseType: 'text'});
  }

  localizarExperience(id?: number): Observable<any> {
    return this.http.get(this.url + id);
  }

  listarExperiencesPerson(idPerson?: string): Observable<any> {
    return this.http.get(this.url + 'pessoa/' + idPerson);
  }

}
