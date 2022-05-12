import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  listarPessoas(): Observable<any> {
    return this.http.get(AppConstants.urlPerson);
  }

  inserirPessoa(pessoa: any): Observable<any> {
    return this.http.post(AppConstants.urlPerson, pessoa);
  }

  atualizarPessoa(pessoa: any): Observable<any> {
    return this.http.put(AppConstants.urlPerson, pessoa);
  }

  excluirPessoa(id: string): Observable<any> {
    return this.http.delete(AppConstants.urlPerson + id, {responseType: 'text'});
  }

  localizarPessoa(id?: string): Observable<any> {
    return this.http.get(AppConstants.urlPerson + id);
  }

  localizarPersonUser(loginUser: string): Observable<any> {
    return this.http.get(AppConstants.urlPerson + 'usuario/' + loginUser);
  }

  emitirRelatorioPessoas() {
    console.log('Emitir o Relatório');
//    return this.http.get(AppConstants.urlPerson + 'relatorio', {responseType: 'text'}).subscribe(data => {
//      document.querySelector('iframe').src = data;
//    });
  }

}
