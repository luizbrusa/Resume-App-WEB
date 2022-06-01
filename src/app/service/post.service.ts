import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url: string = AppConstants.urlPath + 'post/';

  constructor(private http: HttpClient) { }

  listarPosts(): Observable<any> {
    return this.http.get(this.url);
  }

  inserirPost(post: any): Observable<any> {
    return this.http.post(this.url, post);
  }

  atualizarPost(post: any): Observable<any> {
    return this.http.put(this.url, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.url + id, {responseType: 'text'});
  }

  localizarPost(id?: number): Observable<any> {
    return this.http.get(this.url + id);
  }

  listarPostsPessoa(idPessoa: string): Observable<any> {
    return this.http.get(this.url + 'pessoa/' + idPessoa);
  }

}
