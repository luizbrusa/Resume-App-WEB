import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  person: Person = new Person();

  constructor(private routeActive: ActivatedRoute, private router: Router, private personService: PersonService) { }

  ngOnInit(): void { 
    const id = this.routeActive.snapshot.paramMap.get('id');

    if (id !== null) {
      this.personService.localizarPessoa(id).subscribe({
        next: data => {
          this.person = data;
        },
        error: (erro) => console.error('Erro ao Buscar Person: ' + erro)
      });
    } else {
      this.router.navigate(['login']);
    }
  }

  newPerson() {
    const idAux = this.person.id;
    this.person = new Person();
    this.person.id = idAux;
  }

  exit() {
    localStorage.setItem('token','');
    localStorage.setItem('personId','');
    this.router.navigate(['login']);
  }

}
