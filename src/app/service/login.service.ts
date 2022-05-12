import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  efetuarlogin(user: { login: string; senha: string; }) {

    localStorage.setItem('token', '');

    return this.http.post(AppConstants.urlLogin, JSON.stringify(user)).subscribe({
      next: (data) => {
        console.log('Token Retornado: ' + JSON.stringify(data));
        const token = JSON.parse(JSON.stringify(data)).Authorization;
        localStorage.setItem('token', token);
      },
      error: (erro) => console.error('Erro ao Fazer Login: ', erro),
      complete: () => this.router.navigate(['person'])
    })
  }

  recuperarlogin(login: string) {
    let user = new User();
    user.login = login;

    return this.http.post(AppConstants.urlPath + 'recuperarLogin/',user).subscribe({
      next: data => {
        alert(JSON.parse(JSON.stringify(data)).error);
      },
      error: erro => console.error('Erro ao Recuperar o Login: ' + erro)
    });
  }
}
