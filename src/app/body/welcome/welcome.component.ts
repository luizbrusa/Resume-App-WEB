import { Component, OnInit } from "@angular/core";
import { Pessoa } from "src/app/model/person";
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.min.css", "./welcome.component.responsivity.min.css"]
})

export class WelcomeComponent implements OnInit {

  person: Pessoa = new Pessoa();

  constructor() {}

  ngOnInit(): void {
    this.person = environment.person;
  }

  get characterName(): string {
    return this.person.name;
  }

  get showCaricature() {
    if (this.person.caricatureTypeFile) {
      return this.person.caricatureTypeFile + ',' + this.person.caricature;
    } else {
      return '';
    }
  }

}
