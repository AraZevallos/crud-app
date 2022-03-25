import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {
    path:'',
    component: AppComponent,
    children: [
      {
        path:'',
        component: LoginComponent
      },
      {
        path:'principal',
        component: PrincipalComponent
      },
      {
        path:'students',
        component: StudentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
