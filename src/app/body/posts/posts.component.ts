import { Component, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Pessoa } from "src/app/model/person";
import { environment } from "src/environments/environment";
import { AbstractSwipeSection } from "../../core/shared/abstract.swipe.section";
import { Post } from "../../model/post";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss", "./posts.component.responsivity.scss"]
})
export class PostsComponent extends AbstractSwipeSection implements OnInit {

  person: Pessoa = new Pessoa();

  currentPage: number = 1;
  resultsPerPage: number;
  
  faChevronLeft: IconDefinition;
  faChevronRight: IconDefinition;

  constructor() {
    super();
   }

  ngOnInit(): void {
    this.person = environment.person;

    this.faChevronLeft = faChevronLeft;
    this.faChevronRight = faChevronRight;
  }

  public onClickPrevious(): void {
    this.currentPage--;
  }

  public onClickNext() {
    this.currentPage++;
  }

  public updateNavigation(resultsPerPage: number) {
    this.resultsPerPage = resultsPerPage;
  }

  public disablePreviousNavigation(): boolean {
    return this.currentPage === 1;
  }

  public disableNextNavigation(): boolean {
    if (this.person && this.person.posts) {
      if (this.person.posts.length > this.resultsPerPage) {
        return this.currentPage === Math.ceil(this.person.posts.length / this.resultsPerPage);
      } else {
        return true;
      }
    } else {
      return true;
    }
  } 
}