import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuizzComponent } from './pages/quizz/quizz.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'quizz', component: QuizzComponent, pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
