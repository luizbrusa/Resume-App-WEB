import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from './app-constants';
import { PersonService } from './service/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Resume-App-WEB';

  constructor(private router: Router, private personService: PersonService) { }

  ngOnInit(): void {
    console.log('Usuário Autenticado: ' + AppConstants.isUsuarioAutenticado + ' Pessoa Logada: ' + AppConstants.isPersonLogada );
    if ((!AppConstants.isUsuarioAutenticado) && (!AppConstants.isPersonLogada)) {
      this.router.navigate(['login']);
    } else if ((!AppConstants.isUsuarioAutenticado) && (AppConstants.isPersonLogada)) {
      this.router.navigate(['home',localStorage.getItem('personId')?.trim()]);
    } else if ((AppConstants.isUsuarioAutenticado) && (!AppConstants.isPersonLogada)) {
      this.personService.localizarPersonUser(AppConstants.retornaUserToken).subscribe({
        next: data => {
          console.log('IdPerson: ' + data.id);
          if (data.id != null) {
            localStorage.setItem('personId',data.id);
          }
        },
        error: (erro) => console.error('Erro ao Buscar Person: ' + erro),
        complete: () => {
          if (AppConstants.isPersonLogada) {
            this.router.navigate(['person',localStorage.getItem('personId')]);
          } else {
            this.router.navigate(['person']);
          }
        }
      });
    } else {
      this.router.navigate(['person',localStorage.getItem('personId')]);
    }
  }

}
