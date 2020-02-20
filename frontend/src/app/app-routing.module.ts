import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component'
import {SignupComponent} from './signup/signup.component'
import {EditComponent} from './edit/edit.component'

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path : 'signup', component: SignupComponent},
  {path: 'dashboard/:id', component: DashboardComponent },
  {path: 'edit/:id', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
