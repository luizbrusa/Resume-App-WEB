import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userPadrao = 'admin';
  user = {login: '', senha: ''};

  constructor(private loginService: LoginService, private router: Router, private personService: PersonService) {}

  ngOnInit() {
    if (AppConstants.isUsuarioAutenticado) {
      if (AppConstants.isPersonLogada) {
        this.router.navigate(['person',localStorage.getItem('personId')]);
      } else {
        this.router.navigate(['person']);
      }
    }
  }

  public efetuarLogin() {
    this.loginService.efetuarlogin(this.user);
  }

  public recuperarLogin() {
    this.loginService.recuperarlogin(this.user.login);
  }
}
