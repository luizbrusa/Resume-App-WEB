import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PersonComponent } from './person/person.component';
import { ServiceGuard } from './service/service.guard';

const routes: Routes = [  
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home/:id', component: HomeComponent},
  {path: 'person', component: PersonComponent, canActivate: [ServiceGuard]},
  {path: 'person/:id', component: PersonComponent, canActivate: [ServiceGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
