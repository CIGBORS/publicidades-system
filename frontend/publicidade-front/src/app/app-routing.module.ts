import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicidadesComponent } from './pages/publicidades/publicidades.component';

const routes: Routes = [
  { path: '', component: PublicidadesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }