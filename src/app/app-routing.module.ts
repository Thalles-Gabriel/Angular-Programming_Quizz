import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './pages/home/home.component';
import { QuizzComponent } from './pages/quizz/quizz.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'quizz', component: QuizzComponent, pathMatch:'full'
  },
  {
    path:'**', component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
