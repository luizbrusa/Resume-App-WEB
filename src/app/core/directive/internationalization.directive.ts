import { Directive, ElementRef, Input, OnInit} from "@angular/core";
import { LocaleService } from "src/app/service/locale.service";
import { EllipsisPipe } from "../pipe/ellipsis.pipe";

@Directive({ selector: "[appInternationalization]" })
export class InternationalizationDirective {

    private _data: any[] = [];

    @Input() property :string;

    @Input() get data(): any[] {
        return this._data;
    }

    @Input() ellipsis :number;

    constructor(
        private el: ElementRef,
        private localeService: LocaleService
    ) {}

    set data(value: any[]) {
        if(value) {
            this._data = value;
            this.el.nativeElement.innerHTML = this.retrievePropertyValueByLocation();
        }
    }

    private retrievePropertyValueByLocation(): any {

        if(this._data) {

            const value: string[] = this._data
                .filter(element => element.language === (this.localeService.currentLocale || "en"))
                .map(element => element[this.property]) || [""];

            return this.ellipsis > 0 ? new EllipsisPipe().transform(value[0], this.ellipsis) : value;

        }
    }
}
