import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from '../../app-constants';
import { Person } from '../../model/person';
import { PersonService } from '../../service/person.service';
import { MediaService } from '../../service/media.service';
import { Media } from '../../model/media';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../../model/post';
import { Hobbie } from '../../model/hobbie';
import { PostService } from '../../service/post.service';
import { HobbieService } from '../../service/hobbie.service';
import { Internationalization } from '../../model/internationalization';
import { InternationalizationService } from '../../service/internationalization.service';
import { Experience } from '../../model/experience';
import { ExperienceService } from '../../service/experience.service';

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
  selector: 'app-person',
  templateUrl: './cadPerson.component.html',
  styleUrls: ['./cadPerson.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: FormataData},
    {provide: NgbDateAdapter, useClass: FormataDataAdapter}
  ]
})
export class CadPersonComponent implements OnInit {

  person: Person = new Person();
  media: Media = new Media();
  post: Post = new Post();
  hobbie: Hobbie = new Hobbie();
  experience: Experience = new Experience();
  internPerson: Internationalization = new Internationalization();

  constructor(private routeActive: ActivatedRoute, 
    private personService: PersonService, 
    private mediaService: MediaService, 
    private postService: PostService,
    private hobbieService: HobbieService,
    private internationalizationService: InternationalizationService,
    private experienceService: ExperienceService,
    private router: Router,
    private domSanitizer: DomSanitizer) { }

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
      this.router.navigate(['resume']);
    } else {
      this.router.navigate(['login']);
    }
  }

  cadExperience() {
      this.router.navigate(['experience',this.person.id]);
  }

  savePerson() {
    if (this.person.id != null) {
      console.log(JSON.stringify(this.person));
      this.personService.atualizarPessoa(this.person).subscribe(data => {
        console.log('Atualizou: ' + data);
      });
    } else {
      this.personService.inserirPessoa(this.person).subscribe(data => {
        console.log('Inseriu: ' + data);
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

  onclickPosts() {
    this.inativaTabs()

    document.getElementById('linkPosts')?.classList.add('active');
    let div = document.getElementById('divPosts');
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
          this.person.perfilImageTypeFile = array[0];
          this.person.perfilImage = array[1];
        }
      }
    }
    reader.readAsDataURL(file);
  }

  showPerfilImage() {
    if (this.person.perfilImageTypeFile) {
      return this.person.perfilImageTypeFile + ',' + this.person.perfilImage;
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
          this.person.caricatureTypeFile = array[0];
          this.person.caricature = array[1];
        }
      }
    }
    reader.readAsDataURL(file);
  }

  showCaricature() {
    if (this.person.caricatureTypeFile) {
      return this.person.caricatureTypeFile + ',' + this.person.caricature;
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
          this.person.resume = array[1];
          this.person.resumeName = file.name;
        }
      }
    }
    reader.readAsDataURL(file);
  }

  showResume() {
    if (this.person.resume) {
      return this.domSanitizer.bypassSecurityTrustUrl('data:application/pdf;base64,' + this.person.resume);
    } else {
      return '';
    }
  }

  inserirMedia() {
    if (this.person.medias === undefined) {
      this.person.medias = new Array<Media>();
    }

    this.person.medias.push(this.media);
    this.media = new Media();
  }

  deleteMedia(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.mediaService.deleteMedia(id).subscribe(data => {
          this.person.medias?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
        });
      }
    } else {
        this.person.medias?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

  inserirPost() {
    if (this.person.posts === undefined) {
      this.person.posts = new Array<Post>();
    }

    this.person.posts.push(this.post);
    this.post = new Post();
  }

  deletePost(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.postService.deletePost(id).subscribe(data => {
          this.person.posts?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
        });
      }
    } else {
        this.person.posts?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

  inserirHobbie() {
    if (this.person.hobbies === undefined) {
      this.person.hobbies = new Array<Hobbie>();
    }

    this.person.hobbies.push(this.hobbie);
    this.hobbie = new Hobbie();
  }

  deleteHobbie(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.hobbieService.deleteHobbie(id).subscribe(data => {
          this.person.hobbies?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
        });
      }
    } else {
        this.person.hobbies?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

  inserirInternPerson() {
    if (this.person.internationalizations === undefined) {
      this.person.internationalizations = new Array<Internationalization>();
    }

    this.person.internationalizations.push(this.internPerson);
    this.internPerson = new Internationalization();
  }

  deleteInternPerson(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.internationalizationService.deleteInternationalization(id).subscribe(data => {
          this.person.internationalizations?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
        });
      }
    } else {
        this.person.internationalizations?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

  inserirExperience() {
    if (this.person.experiences === undefined) {
      this.person.experiences = new Array<Experience>();
    }

    this.person.experiences.push(this.experience);
    this.experience = new Experience();
  }

  deleteExperience(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.experienceService.deleteExperience(id).subscribe(data => {
          this.person.experiences?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
        });
      }
    } else {
        this.person.experiences?.splice(index, 1); // Exclui o Registro somente da Tela
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

}
