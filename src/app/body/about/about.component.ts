import { Component, OnInit, OnDestroy } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Person } from "src/app/model/person";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss", "./about.component.responsivity.scss"]
})
export class AboutComponent implements OnInit {

  person: Person = new Person();

  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIconPacks(fas, fab);
  }

  ngOnInit(): void {
    this.person = environment.person;
  }

  get calcAge(): string {
//    console.log(dateString);
//    const birthday: Date = new Date(dateString);

//    console.log('Teste');

//    const ageDifMs: number = Date.now() - birthday.getTime();
//    const ageDate: Date = new Date(ageDifMs); // miliseconds from epoch
//    return Math.abs(ageDate.getFullYear() - 1970);

    return '42';
  }

  get showPerfilImage() {
    if (this.person.perfilImageTypeFile) {
      return this.person.perfilImageTypeFile + ',' + this.person.perfilImage;
    } else {
      return '';
    }
  }

  get perfilImageStyle() {
    return "background-image: url('" + this.showPerfilImage + "')";
  }

}
