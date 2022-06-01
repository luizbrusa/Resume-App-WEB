import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorModule } from './service/interceptor.service';

import { LoginComponent } from './login/login.component';
import { CadExperienceComponent } from './register/experience/cadExperience.component';
import { CadPostComponent } from './register/post/cadPost.component';
import { CadPersonComponent } from './register/person/cadPerson.component';

import { CommonModule, registerLocaleData } from '@angular/common';
import localeEn from "@angular/common/locales/en";
import localePt from "@angular/common/locales/pt";

import { LocaleProvider } from './locale.provider';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(localeEn, "en");
registerLocaleData(localePt, "pt-BR");

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadExperienceComponent,
    CadPostComponent,
    CadPersonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpInterceptorModule,
    NgbModule,
    BrowserAnimationsModule,

    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./resume/resume.module').then(m => m.ResumeModule),
      },
    ]),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [ LocaleProvider ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}