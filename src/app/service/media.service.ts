import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private url: string = AppConstants.urlPath + 'media/';

  constructor(private http: HttpClient) { }

  listarMedias(): Observable<any> {
    return this.http.get(this.url);
  }

  inserirMedia(media: any): Observable<any> {
    return this.http.post(this.url, media);
  }

  atualizarMedia(media: any): Observable<any> {
    return this.http.put(this.url, media);
  }

  deleteMedia(id: number): Observable<any> {
    return this.http.delete(this.url + id, {responseType: 'text'});
  }

  localizarMedia(id?: string): Observable<any> {
    return this.http.get(this.url + id);
  }

}
