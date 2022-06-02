import { Component, OnInit, OnDestroy } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Pessoa } from "src/app/model/person";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.min.scss", "./about.component.responsivity.min.scss"]
})
export class AboutComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIconPacks(fas, fab);
  }

  ngOnInit(): void {
    this.pessoa = environment.person;
  }

  get calcAge(): string {
    const birthday: Date = new Date(this.pessoa.birth);
    const ageDifMs: number = Date.now() - birthday.getTime();
    const ageDate: Date = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getFullYear() - 1970).toString();
  }

  get showPerfilImage() {
    if (this.pessoa.perfilImageTypeFile) {
      return this.pessoa.perfilImageTypeFile + ',' + this.pessoa.perfilImage;
    } else {
      return '';
    }
  }

  get perfilImageStyle() {
    return "background-image: url('" + this.showPerfilImage + "')";
  }

}
