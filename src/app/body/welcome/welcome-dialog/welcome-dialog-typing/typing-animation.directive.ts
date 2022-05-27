import { Directive, OnInit, ElementRef, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Typed } from "./typed";

interface IPhrase {
    phrases: string[];
}

@Directive({
    selector: "[appTypingAnimation]"
})

export class TypingAnimationDirective implements OnInit {

    @Input() phrasePeriod: number;
    @Input() typeSpeed: number;
    @Input() startDelay: number;
    @Input() data: string[];

    typed: Typed;
    phrases: string[] = [];

    constructor (
        private elRef: ElementRef,
        private translateService: TranslateService
    ) {}

    ngOnInit () {
        this.translateService.get('dialog.phrases').subscribe((translate: string[]) => {
            this.phrases = translate;
        });

        if(this.checkContent()) {
            this.createTyped();
        }
    }

    private checkContent() {
        return this.phrases.length > 0;
    }

    private createTyped () {
       this.typed = new Typed(
            this.elRef.nativeElement,
            {
                typeSpeed: this.typeSpeed,
                startDelay: this.startDelay,
                phrasePeriod: this.phrasePeriod
            },
            this.phrases
        );

        this.typed.begin();
    }
}
