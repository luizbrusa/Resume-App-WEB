import { Component, OnInit } from "@angular/core";
import { Person } from "src/app/model/person";
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css", "./welcome-component.responsivity.css"]
})

export class WelcomeComponent implements OnInit {

  person: Person = new Person();

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
