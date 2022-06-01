import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadExperienceComponent } from './register/experience/cadExperience.component';
import { CadPostComponent } from './register/post/cadPost.component';
import { CadPersonComponent } from './register/person/cadPerson.component';
import { ResumeComponent } from './resume/resume.component';
import { ServiceGuard } from './service/service.guard';

const routes: Routes = [
  { path: '', component: ResumeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'person', component: CadPersonComponent, canActivate: [ServiceGuard] },
  { path: 'person/:id', component: CadPersonComponent, canActivate: [ServiceGuard] },
  { path: 'experience/:idPerson', component: CadExperienceComponent, canActivate: [ServiceGuard] },
  { path: 'post/:idPerson', component: CadPostComponent, canActivate: [ServiceGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      anchorScrolling: "enabled",
      onSameUrlNavigation: "reload"
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
