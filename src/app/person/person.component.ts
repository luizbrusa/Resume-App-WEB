import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person: Person = new Person();

  constructor(private routeActive: ActivatedRoute, private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
    const id = this.routeActive.snapshot.paramMap.get('id');

    if (id !== null) {
      this.personService.localizarPessoa(id).subscribe(data => {
        this.person = data;
      });
    } else {
      this.personService.localizarPersonUser(AppConstants.retornaUserToken).subscribe({
        next: data => {
          this.person = data;
          localStorage.setItem('personId',this.person.id ? this.person.id : '');
        },
        error: (erro) => console.error('Erro ao Buscar Person: ' + erro)
      });
    }
  }

  newPerson() {
    this.person = new Person();
  }

  exit() {
    localStorage.setItem('token','');
    if (AppConstants.isPersonLogada) {
      this.router.navigate(['home',this.person.id]);
    } else {
      this.router.navigate(['login']);
    }
  }

  savePerson() {
    if (this.person.id != null) {
      console.log('Atualizar a pessoa' + this.person.name);
//      this.personService.atualizarPessoa(this.person).subscribe(data => {
//        console.log('Atualizou: ' + data);
//      });
    } else {
      console.log('Inserir a pessoa' + this.person.name);
//      this.personService.inserirPessoa(this.person).subscribe(data => {
//        console.log('Inseriu: ' + data);
//      });
    }
  }
}
