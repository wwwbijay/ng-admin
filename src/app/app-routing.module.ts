import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { CpanelComponent } from './cpanel/cpanel.component';

import { HoroscopeRoutingModule } from './horoscope/horoscope-routing.module';


const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: CpanelComponent,
    path: '',
    data: {
      breadcrumb: 'Home'
    },
    canActivate: [AuthGuard],
    loadChildren: () => HoroscopeRoutingModule
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
