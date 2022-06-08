import { Component, Input, HostListener, EventEmitter, ElementRef, Output } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { debounce } from "../../../core/utils";
import { Post } from "src/app/model/post";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-posts-carousel",
    templateUrl: "./posts-carousel.component.html",
    styleUrls: ["./posts-carousel.component.scss", "./posts-carousel.component.responsivity.scss"],
    animations: [
        trigger("fadeInOut", [
            state("void", style({
                opacity: 0
            })),
            transition("void <=> *", animate(300)),
        ])
    ]
})

export class PostsCarouselComponent {

    public _posts: Array<Post> = new Array<Post>();
    public _originalPosts: Array<Post> = new Array<Post>();
    public _currentPage: number;

    @Output() resultsPerPageChanged = new EventEmitter<number>();

    resultsPerPage: number;
    elWidth: number;
    start: number;
    end: number;
    closeResult: string = '';

    constructor(private elRef: ElementRef, private modalService: NgbModal) { }

    @Input() get currentPage(): number {
        return this._currentPage;
    }

    set currentPage(value: number) {
        if(value) {
            this._currentPage = value;
            this.populateCarousel();
        }
    }

    @Input() get posts(): Array<Post> {
        return this._posts;
    }

    set posts(value: Array<Post>) {
        if(value) {
            this._originalPosts = value;
            this._originalPosts.sort((a: Post, b: Post) => +new Date(b.date) - +new Date(a.date));
            this.onResizeElement();
        }
    }

    @HostListener("window:resize")
    @debounce(25)
    onResize() {
        this.onResizeElement();
    }

    private onResizeElement(): void {
        this.elWidth = this.elRef.nativeElement.clientWidth;
        this.resultsPerPage = Math.ceil(this.elWidth / 465);

        this.populateCarousel();
    }

    private populateCarousel(): void {

        if(this._currentPage && this._posts) {
            this.start =  (this._currentPage - 1) * this.resultsPerPage;
            this.end = this._currentPage * this.resultsPerPage;
            this._posts = this._originalPosts.slice(this.start, this.end);

            this.resultsPerPageChanged.emit(this.resultsPerPage);
        }
    }

    openModal(modal: any, post: Post) {
        this.modalService.open(modal, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl'
        });

        let iFrame = document.getElementById('letter');
        if (iFrame) {
            iFrame.setAttribute('src',post.fileTypeFile + ',' + post.file);
        } 
    }
}
