import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Internationalization } from 'src/app/model/internationalization';
import { Pessoa } from 'src/app/model/person';
import { Post } from 'src/app/model/post';
import { InternationalizationService } from 'src/app/service/internationalization.service';
import { PostService } from 'src/app/service/post.service';

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
  templateUrl: './cadPost.component.html',
  styleUrls: ['./cadPost.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: FormataData},
    {provide: NgbDateAdapter, useClass: FormataDataAdapter}
  ]
})
export class CadPostComponent implements OnInit {

  idPerson: string | null;
  post: Post = new Post();
  internationalization: Internationalization = new Internationalization();
  posts: Array<Post> = new Array<Post>();

  constructor(private routeActive: ActivatedRoute, private router: Router, 
    private postService: PostService,
    private internationalizationService: InternationalizationService) { }

  ngOnInit(): void {
    this.idPerson = this.routeActive.snapshot.paramMap.get('idPerson');

    if (!this.idPerson) {
      this.idPerson = localStorage.getItem('personId');
    }

    if (this.idPerson) {
      this.postService.listarPostsPessoa(this.idPerson).subscribe(data => {
        this.posts = data;
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

  onclickPost() {
    this.inativaTabs()

    document.getElementById('linkPost')?.classList.add('active');
    let div = document.getElementById('divPost');
    let divList = document.getElementById('divPostList');
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

  newPost() {
    this.post = new Post();
  }

  editPost(idPost: number) {
    if (idPost) {
      this.postService.localizarPost(idPost).subscribe(data => {
        this.post = data;
      });
    }
  }

  exit() {
    this.router.navigate(['person']);
  }

  savePost() {
    if (this.idPerson){
      let pessoa: Pessoa = new Pessoa();
      pessoa.id = this.idPerson;
      this.post.pessoa = pessoa;
    }

    if (this.post.id != null) {
      this.postService.atualizarPost(this.post).subscribe(data => {
        console.log('Atualizou: ' + data);
        alert('Registro Atualizado com Sucesso!');
      });
    } else {
      this.postService.inserirPost(this.post).subscribe(data => {
        console.log('Inseriu: ' + data);
        alert('Registro Inserido com Sucesso!');
      });
    }
  }

  deletePost(id: number, index: number) {
    if (confirm('Deseja Realmente Excluir o Registro')) {
      this.postService.deletePost(id).subscribe(data => {
        this.posts?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
        console.log('Excluído com Sucesso: ' + data);
        alert('Registro Excluído com Sucesso!');
      });
    }
  }

  selectThumbnail(event: Event): void {
    const element: any = event.target;
    var array: string[] | undefined;

    var file = element.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      if (reader.result) {
        array = reader.result?.toString().split(',');
      
        if (array) {
          this.post.thumbnailTypeFile = array[0];
          this.post.thumbnail = array[1];
          this.post.thumbnailName = file.name;
        }
      }
    }
    reader.readAsDataURL(file);
  }

  selectFile(event: Event): void {
    const element: any = event.target;
    var array: string[] | undefined;

    var file = element.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      if (reader.result) {
        array = reader.result?.toString().split(',');
      
        if (array) {
          this.post.fileTypeFile = array[0];
          this.post.file = array[1];
          this.post.fileName = file.name;
        }
      }
    }
    reader.readAsDataURL(file);
  }

  inserirInternPost() {
    if (this.post.internationalizations === undefined) {
      this.post.internationalizations = new Array<Internationalization>();
    }

    this.post.internationalizations.push(this.internationalization);
    this.internationalization = new Internationalization();
  }

  deleteInternPost(id: number | undefined, index: number) {
    if (id !== undefined) {
      if (confirm('Deseja Realmente Excluir o Registro')) {
        this.internationalizationService.deleteInternationalization(id).subscribe(data => {
          this.post.internationalizations?.splice(index, 1); // Exclui o Registro da Tela após do Banco de Dados
          console.log('Excluído com Sucesso: ' + data);
          alert('Registro Excluído com Sucesso!');
        });
      }
    } else {
        this.post.internationalizations?.splice(index, 1); // Exclui o Registro somente da Tela
    }
  }

}
