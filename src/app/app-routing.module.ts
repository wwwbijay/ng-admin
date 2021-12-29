import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { CpanelComponent } from './cpanel/cpanel.component';
import { DashboardComponent } from './horoscope/dashboard/dashboard.component';
import { ManageComponent } from './horoscope/manage/manage.component';
import { UpdateDailyComponent } from './horoscope/update-daily/update-daily.component';
import { UpdateWeeklyComponent } from './horoscope/update-weekly/update-weekly.component';
import { UpdateMonthlyComponent } from './horoscope/update-monthly/update-monthly.component';
import { UpdateYearlyComponent } from './horoscope/update-yearly/update-yearly.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: CpanelComponent,
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        component: DashboardComponent,
        path: 'horoscope',
        canActivate: [AuthGuard]
      },
      {
        component: ManageComponent,
        path: 'horoscope/manage',
        canActivate: [AuthGuard]
      },
      {
        component: UpdateDailyComponent,
        path: 'horoscope/update-daily',
        canActivate: [AuthGuard]
      },
      {
        component: UpdateWeeklyComponent,
        path: 'horoscope/update-weekly',
        canActivate: [AuthGuard]
      },
      {
        component: UpdateMonthlyComponent,
        path: 'horoscope/update-monthly',
        canActivate: [AuthGuard]
      },
      {
        component: UpdateYearlyComponent,
        path: 'horoscope/update-yearly',
        canActivate: [AuthGuard]
      },
    ]
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
