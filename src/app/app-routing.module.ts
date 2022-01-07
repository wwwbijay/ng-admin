import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { CpanelComponent } from './cpanel/cpanel.component';

import { HoroscopeRoutingModule } from './horoscope/horoscope-routing.module';
import { AccountRoutingModule } from './account/account-routing.module';

import { DashboardComponent } from './horoscope/dashboard.component';
import { ProfileComponent } from './account/profile.component';


const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
    
  },
  {
    component: CpanelComponent,
    path: '',
    data: {
      breadcrumb: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
      path: 'horoscope',
      data: {
        breadcrumb: 'Horoscope'
      },
      component: DashboardComponent,
      loadChildren: () => HoroscopeRoutingModule
      },
      {
        path: 'account',
        data: {
          breadcrumb: 'Account'
        },
        component: ProfileComponent,
        loadChildren: () => AccountRoutingModule
      }

    ],
    
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
