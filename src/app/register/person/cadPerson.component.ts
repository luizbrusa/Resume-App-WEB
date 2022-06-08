import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from '../../app-constants';
import { Pessoa } from '../../model/person';
import { PersonService } from '../../service/person.service';
import { MediaService } from '../../service/media.service';
import { Media } from '../../model/media';
import { DomSanitizer } from '@angular/platform-browser';
import { Hobbie } from '../../model/hobbie';
import { HobbieService } from '../../service/hobbie.service';
import { Internationalization } from '../../model/internationalization';
import { InternationalizationService } from '../../service/internationalization.service';

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
  selector: 'app-person',
  templateUrl: './cadPerson.component.html',
  styleUrls: ['./cadPerson.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: FormataData},
    {provide: NgbDateAdapter, useClass: FormataDataAdapter}
  ]
})
export class CadPersonComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  media: Media = new Media();
  hobbie: Hobbie = new Hobbie();
  internationalization: Internationalization = new Internationalization();

  constructor(private routeActive: ActivatedRoute, 
    private personService: PersonService, 
    private mediaService: MediaService, 
    private hobbieService: HobbieService,
    private internationalizationService: InternationalizationService,
    private router: Router,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const id = this.routeActive.snapshot.paramMap.get('id');

    if (id !== null) {
      this.personService.localizarPessoa(id).subscribe(data => {
        this.pessoa = data;
      });
    } else {
      this.personService.localizarPersonUser(AppConstants.retornaUserToken).subscribe({
        next: data => {
          this.pessoa = data;
          localStorage.setItem('personId',this.pessoa.id ? this.pessoa.id : '');
        },
        error: (erro) => console.error('Erro ao Buscar Person: ' + erro)
      });
    }
  }

  newPerson() {
    this.pessoa = new Pessoa();
  }

  exit() {
    localStorage.setItem('token','');
    if (AppConstants.isPersonLogada) {
      this.router.navigate(['resume']);
    } else {
      this.router.navigate(['login']);
    }
  }

  cadExperience() {
      this.router.navigate(['experience',this.pessoa.id]);
  }

  cadPost() {
    this.router.navigate(['post',this.pessoa.id]);
  }

  savePerson() {
    if (this.pessoa.id != null) {
      this.personService.atualizarPessoa(this.pessoa).subscribe(data => {
        console.log('Atualizou: ' + data);
        alert('Registro Atualizado com Sucesso!');
      });
    } else {
      this.personService.inserirPessoa(this.pessoa).subscribe(data => {
        console.log('Inseriu: ' + data);
        alert('Registro Inserido com Sucesso!');
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

  onclickPersonal() {
    this.inativaTabs()

    document.getElementById('linkPersonal')?.classList.add('active');
    let divs = document.getElementById('divPersonal');
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

  onclickHobbies() {
    this.inativaTabs()

    document.getElementById('linkHobbies')?.classList.add('active');
    let div = document.getElementById('divHobbies');
    if (div) {
      div.style.display = 'inherit';
    }
  }

  onclickExperiences() {
    this.inativaTabs()

    document.getElementById('linkExperiences')?.classList.add('active');
    let div = document.getElementById('divExperiences');
    if (div) {
      div.style.display = 'inherit';
    }
  }

  onclickPictures() {
    this.inativaTabs()

    document.getElementById('linkPictures')?.classList.add('active');
    let div = document.getElementById('divPictures');
    if (div) {
      div.style.display = 'inherit';
    }
  }

  selectPerfilImage(event: Event): void {
    const element: any = event.target;
    var array: string[] | undefined;

    var file = element.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      if (reader.result) {
        array = reader.result?.toString().split(',');
      
        if (array) {
          this.pessoa.perfilImageTypeFile = array[0];
          this.pessoa.perfilImage = array[1];
        }
      }
    }
    reader.readAsDataURL(file);
  }

  showPerfilImage() {
    if (this.pessoa.perfilImageTypeFile) {
      return this.pessoa.perfilImageTypeFile + ',' + this.pessoa.perfilImage;
    } else {
      return '';
    }
  }

  selectCaricature(event: Event): void {
    const element: any = event.target;
    var array: string[] | undefined;

    var file = element.files[0];
    let reader=new FileReader();
    reader.onload = (e) => {
      if (reader.result) {
        array = reader.result?.toString().split(',');
      
        if (array) {
          this.pessoa.caricatureTypeFile = array[0];
          this.pessoa.caricature = array[1];
        }
      }
    }
    reader.readAsDataURL(file);
  }

  showCaricature() {
    if (this.pessoa.caricatureTypeFile) {
      return this.pessoa.caricatureTypeFile + ',' + this.pessoa.caricature;
    } else {
      return '';
    }
  }

  selectResume(event: Event): void {
    const element: any = event.target;
    var array: string[] | undefined;

    var file = element.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      if (reader.result) {
        array = reader.result?.toString().split(',');
      
        if (array) {
          this.pessoa.resume = array[1];
          this.pessoa.resumeName = file.name;
        }
      }
    }
    reader.readAsDataURL(file);
  }

  showResume() {
    if (this.pessoa.resume) {
      return this.domSanitizer.bypassSecurityTrustUrl('data:application/pdf;base64,' + this.pessoa.resume);
    } else {
      return '';
    }
  }

  inserirMedia() {
    if (this.pessoa.medias === undefined) {
      this.pessoa.medias = new Array<Media>();
    }

    this.pessoa.medias.push(this.media);
    this.media = new Media();
  }

  deleteMedia(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.mediaService.deleteMedia(id).subscribe(data => {
          this.pessoa.medias?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
          alert('Registro Excluído com Sucesso!');
        });
      }
    } else {
        this.pessoa.medias?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

  inserirHobbie() {
    if (this.pessoa.hobbies === undefined) {
      this.pessoa.hobbies = new Array<Hobbie>();
    }

    this.pessoa.hobbies.push(this.hobbie);
    this.hobbie = new Hobbie();
  }

  deleteHobbie(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.hobbieService.deleteHobbie(id).subscribe(data => {
          this.pessoa.hobbies?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
          alert('Registro Excluído com Sucesso!');
        });
      }
    } else {
        this.pessoa.hobbies?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

  inserirInternPerson() {
    if (this.pessoa.internationalizations === undefined) {
      this.pessoa.internationalizations = new Array<Internationalization>();
    }

    this.pessoa.internationalizations.push(this.internationalization);
    this.internationalization = new Internationalization();
  }

  deleteInternPerson(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.internationalizationService.deleteInternationalization(id).subscribe(data => {
          this.pessoa.internationalizations?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
          alert('Registro Excluído com Sucesso!');
        });
      }
    } else {
        this.pessoa.internationalizations?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

}
