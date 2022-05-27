import { NgModule } from "@angular/core";
import { ExperienceComponent } from "./experience.component";
import { ExperienceTimelineComponent } from "./experience-timeline/experience-timeline.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../../core/core.module";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [ 
        CommonModule, 
        FontAwesomeModule, 
        CoreModule, 
        RouterModule.forChild([
            {
              path: '',
              pathMatch: 'full',
              component: ExperienceComponent,
            },
          ]),
          TranslateModule.forChild()
    ],
    declarations: [ ExperienceComponent, ExperienceTimelineComponent ],
    exports: [ ExperienceComponent ]
})

export class ExperienceModule { }