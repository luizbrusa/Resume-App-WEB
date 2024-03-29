import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Pessoa } from '../model/person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url: string = AppConstants.urlPath + 'pessoa/';
  private urlLocal: string = AppConstants.baseUrlLocal + 'person.json';

  constructor(private http: HttpClient) { }

  listarPessoas(): Observable<any> {
//    return this.http.get(this.url);
    return this.http.get(this.urlLocal);
  }

  localizarPessoa(id: string | null): Observable<any> {
//    return this.http.get(this.url + id);
    return this.http.get(this.urlLocal);
  }

  localizarPersonUser(loginUser: string): Observable<any> {
//    return this.http.get(this.url + 'usuario/' + loginUser);
    return this.http.get(this.urlLocal);
  }

  inserirPessoa(pessoa: any): Observable<any> {
    return this.http.post(this.url, pessoa);
  }

  atualizarPessoa(pessoa: any): Observable<any> {
    return this.http.put(this.url, pessoa);
  }

  excluirPessoa(id: string): Observable<any> {
    return this.http.delete(this.url + id, {responseType: 'text'});
  }

  get getPerson(): Pessoa {
    if (!environment.person.id) {
      this.localizarPessoa(localStorage.getItem('personId')).subscribe({
        next: data => {
          environment.person = data;
        },
        error: (erro) => console.error('Erro ao Buscar Person: ' + erro)
      });
    }

    return environment.person;
  }

  emitirRelatorioPessoas() {
    console.log('Emitir o Relatório');
//    return this.http.get(AppConstants.urlPerson + 'relatorio', {responseType: 'text'}).subscribe(data => {
//      document.querySelector('iframe').src = data;
//    });
  }

}
