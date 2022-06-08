import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Experience } from 'src/app/model/experience';
import { Internationalization } from 'src/app/model/internationalization';
import { Media } from 'src/app/model/media';
import { Pessoa } from 'src/app/model/person';
import { Technology } from 'src/app/model/technology';
import { ExperienceService } from 'src/app/service/experience.service';
import { InternationalizationService } from 'src/app/service/internationalization.service';
import { MediaService } from 'src/app/service/media.service';
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

  idPerson: string | null;
  experience: Experience = new Experience();
  media: Media = new Media();
  internationalization: Internationalization = new Internationalization();
  technologyExp: Technology = new Technology();
  experiences: Array<Experience> = new Array<Experience>();

  constructor(private routeActive: ActivatedRoute, private router: Router, 
    private experienceService: ExperienceService,
    private internationalizationService: InternationalizationService,
    private technologyService: TechnologyService,
    private mediaService: MediaService) { }

  ngOnInit(): void {
    this.idPerson = this.routeActive.snapshot.paramMap.get('idPerson');

    if (!this.idPerson) {
      this.idPerson = localStorage.getItem('personId');
    }

    if (this.idPerson) {
      this.experienceService.listarExperiencesPessoa(this.idPerson).subscribe(data => {
        this.experiences = data;
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

  onclickMedias() {
    this.inativaTabs()

    document.getElementById('linkMedias')?.classList.add('active');
    let div = document.getElementById('divMedias');
    if (div) {
      div.style.display = 'inherit';
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
    if (this.idPerson) {
      let pessoa: Pessoa = new Pessoa();
      pessoa.id = this.idPerson;
      this.experience.pessoa = pessoa;
    }

    if (this.experience.id != null) {
      console.log(this.experience);
      this.experienceService.atualizarExperience(this.experience).subscribe(data => {
        console.log('Atualizou: ' + data);
        alert('Registro Atualizado com Sucesso!');
      });
    } else {
      this.experienceService.inserirExperience(this.experience).subscribe(data => {
        console.log('Inseriu: ' + data);
        alert('Registro Inserido com Sucesso!');
      });
    }
  }

  deleteExperience(id: number, index: number) {
    if (confirm('Deseja Realmente Excluir o Registro')) {
      this.experienceService.deleteExperience(id).subscribe(data => {
        this.experiences?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
        console.log('Excluído com Sucesso: ' + data);
        alert('Registro Excluído com Sucesso!');
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

    this.experience.internationalizations.push(this.internationalization);
    this.internationalization = new Internationalization();
  }

  deleteInternExp(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.internationalizationService.deleteInternationalization(id).subscribe(data => {
          this.experience.internationalizations?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
          alert('Registro Excluído com Sucesso!');
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
          alert('Registro Excluído com Sucesso!');
        });
      }
    } else {
        this.experience.technologies?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

  inserirMedia() {
    if (this.experience.medias === undefined) {
      this.experience.medias = new Array<Media>();
    }

    this.experience.medias.push(this.media);
    this.media = new Media();
  }

  deleteMedia(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.mediaService.deleteMedia(id).subscribe(data => {
          this.experience.medias?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
          alert('Registro Excluído com Sucesso!');
        });
      }
    } else {
        this.experience.medias?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

}
