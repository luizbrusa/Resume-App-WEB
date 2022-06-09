import { Component, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Post } from "src/app/model/post";
import { environment } from "src/environments/environment";
import { AbstractSwipeSection } from "../../core/shared/abstract.swipe.section";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss", "./posts.component.responsivity.scss"]
})
export class PostsComponent extends AbstractSwipeSection implements OnInit {

  posts: Array<Post> = new Array<Post>();

  currentPage: number = 1;
  resultsPerPage: number;
  
  faChevronLeft: IconDefinition;
  faChevronRight: IconDefinition;

  constructor() {
    super();
   }

  ngOnInit(): void {
    if (environment.person && environment.person.posts) {
      this.posts = environment.person.posts;
      this.posts.sort((a: Post, b: Post) => +new Date(b.date) - +new Date(a.date));
    }

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
    if (this.posts.length > 0) {
      if (this.posts.length > this.resultsPerPage) {
        return this.currentPage === Math.ceil(this.posts.length / this.resultsPerPage);
      } else {
        return true;
      }
    } else {
      return true;
    }
  } 
}