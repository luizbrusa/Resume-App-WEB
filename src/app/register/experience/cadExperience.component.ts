import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Experience } from 'src/app/model/experience';
import { Internationalization } from 'src/app/model/internationalization';
import { Person } from 'src/app/model/person';
import { Technology } from 'src/app/model/technology';
import { ExperienceService } from 'src/app/service/experience.service';
import { InternationalizationService } from 'src/app/service/internationalization.service';
import { PersonService } from 'src/app/service/person.service';
import { TechnologyService } from 'src/app/service/technology.service';

@Injectable()
export class FormataDataAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        month: parseInt(date[0], 10),
        day: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    } else {
      return null;
    }
  }

  toModel(date: NgbDateStruct): string {
//    return date ? formatar(date.day) + this.DELIMITER + formatar(date.month) + this.DELIMITER + date.year : '';
    return date ? formatar(date.month) + this.DELIMITER + formatar(date.day) + this.DELIMITER + date.year : '';
  }
}

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        month: parseInt(date[0], 10),
        day: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    } else {
      return null;
    }
  }

  format(date: NgbDateStruct | null): string {
//    return date ? formatar(date.day) + this.DELIMITER + formatar(date.month) + this.DELIMITER + date.year : '';
    return date ? formatar(date.month) + this.DELIMITER + formatar(date.day) + this.DELIMITER + date.year : '';
  }
}

function formatar(valor: any) {
  if (valor.toString !== '' && parseInt(valor) < 10) {
    return '0' + valor;
  } else {
    return valor;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './cadExperience.component.html',
  styleUrls: ['./cadExperience.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: FormataData},
    {provide: NgbDateAdapter, useClass: FormataDataAdapter}
  ]
})
export class CadExperienceComponent implements OnInit {

  person: Person = new Person();
  experience: Experience = new Experience();
  internExp: Internationalization = new Internationalization();
  technologyExp: Technology = new Technology();
  experiences: Array<Experience> = new Array<Experience>();

  constructor(private routeActive: ActivatedRoute, private router: Router, 
    private experienceService: ExperienceService,
    private personService: PersonService,
    private internationalizationService: InternationalizationService,
    private technologyService: TechnologyService) { }

  ngOnInit(): void {
    let idPerson = this.routeActive.snapshot.paramMap.get('idPerson');

    if (!idPerson) {
      idPerson = localStorage.getItem('personId');
    }

    if (idPerson) {
      this.personService.localizarPessoa(idPerson).subscribe(data => {
        this.person = data;
        this.experiences = this.person.experiences;
      });
    }
  }

  inativaTabs() {
    let linkTabs = document.getElementsByClassName('nav-link');
    for (var i=0; i <= linkTabs.length; i++) {
      let link = linkTabs.item(i);
      if (link) {
        link.classList.remove('active');
      }
    };

    let divTabs = document.getElementsByName('divTabs');
    for (var i=0; i <= divTabs.length; i++) {
      let div = divTabs.item(i);
      if (div) {
        div.style.display = 'none';
      }
    };
  }

  onclickExperience() {
    this.inativaTabs()

    document.getElementById('linkExperience')?.classList.add('active');
    let div = document.getElementById('divExperience');
    let divList = document.getElementById('divExperienceList');
    if (div && divList) {
      div.style.display = 'inherit';
      divList.style.display = 'inherit';
    }
  }

  onclickInternationalizations() {
    this.inativaTabs()

    document.getElementById('linkInternationalization')?.classList.add('active');
    let divs = document.getElementById('divInternationalization');
    if (divs) {
      divs.style.display = 'inherit';
    }
  }

  onclickTechnologies() {
    this.inativaTabs()

    document.getElementById('linkTechnology')?.classList.add('active');
    let divs = document.getElementById('divTechnology');
    if (divs) {
      divs.style.display = 'inherit';
    }
  }

  newExperience() {
    this.experience = new Experience();
  }

  editExperience(idExperience: number) {
    if (idExperience) {
      this.experienceService.localizarExperience(idExperience).subscribe(data => {
        this.experience = data;
      });
    }
  }

  exit() {
    this.router.navigate(['person']);
  }

  saveExperience() {
    if (this.experience.id != null) {
      console.log(JSON.stringify(this.experience));
      this.experienceService.atualizarExperience(this.experience).subscribe(data => {
        console.log('Atualizou: ' + data);
      });
    } else {
      this.experienceService.inserirExperience(this.experience).subscribe(data => {
        console.log('Inseriu: ' + data);
      });
    }
  }

  deleteExperience(id: number, index: number) {
    if (confirm('Deseja Realmente Excluir o Registro')) {
      this.experienceService.deleteExperience(id).subscribe(data => {
        this.experiences?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
        console.log('Excluído com Sucesso: ' + data);
      });
    }
  }

  selectLogoExp(event: Event): void {
    const element: any = event.target;
    var array: string[] | undefined;

    var file = element.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      if (reader.result) {
        array = reader.result?.toString().split(',');
      
        if (array) {
          this.experience.logoTypeFile = array[0];
          this.experience.logo = array[1];
          this.experience.logoName = file.name;
        }
      }
    }
    reader.readAsDataURL(file);
  }

  selectBackgroundUrlExp(event: Event): void {
    const element: any = event.target;
    var array: string[] | undefined;

    var file = element.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      if (reader.result) {
        array = reader.result?.toString().split(',');
      
        if (array) {
          this.experience.backgroundUrlTypeFile = array[0];
          this.experience.backgroundUrl = array[1];
          this.experience.backgroundUrlName = file.name;
        }
      }
    }
    reader.readAsDataURL(file);
  }

  inserirInternExp() {
    if (this.experience.internationalizations === undefined) {
      this.experience.internationalizations = new Array<Internationalization>();
    }

    this.experience.internationalizations.push(this.internExp);
    this.internExp = new Internationalization();
  }

  deleteInternExp(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.internationalizationService.deleteInternationalization(id).subscribe(data => {
          this.experience.internationalizations?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
        });
      }
    } else {
        this.experience.internationalizations?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

  inserirTechnologyExp() {
    if (this.experience.technologies === undefined) {
      this.experience.technologies = new Array<Technology>();
    }

    this.experience.technologies.push(this.technologyExp);
    this.technologyExp = new Technology();
  }

  deleteTechnologyExp(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.technologyService.deleteTechnology(id).subscribe(data => {
          this.experience.technologies?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
        });
      }
    } else {
        this.experience.technologies?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

}
