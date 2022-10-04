import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppConstants } from './app-constants';
import { LocaleService } from './service/locale.service';
import { PersonService } from './service/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, 
    private personService: PersonService, 
    private localeService: LocaleService) {
    this.localeService.initLocale('en');
  }

  ngOnInit(): void {
    //Se não tiver o botão de Login pode executar esta parte
    if (!environment.person.id){
      this.personService.localizarPessoa(localStorage.getItem('personId')).subscribe({
        next: data => {
          environment.person = data;
        },
        error: (erro) => console.error('Erro ao Buscar Person: ' + erro),
        complete: () => {
          this.router.navigate(['resume']) //Rota para Resume Component
        }
      });
    } else {
      this.router.navigate(['resume']) //Rota para Resume Component
    }

    //Se tiver o botão de Login pode executar esta parte pois controlará o acesso à aplicação e direcionará para as rotas
/*    console.log('Usuário Autenticado: ' + AppConstants.isUsuarioAutenticado + ' Pessoa Logada: ' + AppConstants.isPersonLogada );

    if ((!AppConstants.isPersonLogada) && (!AppConstants.isUsuarioAutenticado)) {
      this.router.navigate(['login']);
    } else if ((!AppConstants.isPersonLogada) && (AppConstants.isUsuarioAutenticado)) {
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
    } else if ((AppConstants.isPersonLogada) && (!AppConstants.isUsuarioAutenticado)) {
      if (!environment.person.id){
        this.personService.localizarPessoa(localStorage.getItem('personId')).subscribe({
          next: data => {
            environment.person = data;
          },
          error: (erro) => console.error('Erro ao Buscar Person: ' + erro),
          complete: () => {
            this.router.navigate(['resume']) //Rota para Resume Component
          }
        });
      } else {
        this.router.navigate(['resume']) //Rota para Resume Component
      }
    } else {
      this.router.navigate(['person',localStorage.getItem('personId')]);
    }*/
  }

}
