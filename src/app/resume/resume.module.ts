import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ResumeComponent } from "../resume/resume.component";
import { HeaderComponent } from "../body/header/header.component";
import { AboutComponent } from "../body/about/about.component";
import { ContactComponent } from "../body/contact/contact.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { WelcomeModule } from "../body/welcome/welcome.molule";
import { ExperienceModule } from "../body/experience/experience.module";
import { CoreModule } from "../core/core.module";
import { PostsModule } from "../body/posts/posts.molule";
import { ContactService } from "../body/contact/contact.service";
import { FooterComponent } from "../body/footer/footer.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule, 
    CoreModule,
    FontAwesomeModule,
    WelcomeModule,
    ExperienceModule,
    PostsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ResumeComponent,
      },
    ]),
    TranslateModule.forChild(),
  ],
  declarations: [ 
    ResumeComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent
  ],
  exports: [ ResumeComponent ],
  providers: [ 
    ContactService 
  ]
})

export class ResumeModule { }
