import { Component, OnInit, HostListener, Inject, LOCALE_ID } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { debounce } from "../core/utils";

@Component({
  selector: "app-resume",
  templateUrl: "./resume.component.html",
  styleUrls: ["./resume.component.css", "./resume.component.responsivity.css"]
})
export class ResumeComponent implements OnInit {

  isSticky: boolean;
  activeSection: string;

  pageYOffset: number = 0;
  pageXOffset: number;

  constructor(private router: Router) {
    this.checkResize();
  }

  ngOnInit(): void {
    if (!environment.person.id) {
      this.router.navigate(['']) //Rota para Resume Component
    }
  }

  @HostListener("window:scroll")
  @debounce()
  checkScroll() {
    this.pageYOffset = window.pageYOffset;
    this.isSticky = pageYOffset >= 250;
  }

  @HostListener("window:resize")
  @debounce(25)
  checkResize() {
    this.pageXOffset = window.innerWidth;
  }

  @debounce(150)
//  onViewport(isOnViewPort: any, element?: string) {
  onViewport(element?: string) {
      if (element) {
      this.activeSection = element;
    }
  }
}
