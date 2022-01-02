import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { CpanelComponent } from './cpanel/cpanel.component';
import { UpdateYearlyComponent } from './horoscope/update-yearly/update-yearly.component';
import { UpdateMonthlyComponent } from './horoscope/update-monthly/update-monthly.component';
import { UpdateWeeklyComponent } from './horoscope/update-weekly/update-weekly.component';
import { UpdateDailyComponent } from './horoscope/update-daily/update-daily.component';
import { ManageComponent } from './horoscope/manage/manage.component';
import { DashboardComponent } from './horoscope/dashboard.component';


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
    pathMatch: 'prefix', 
    children: [
      {
        component: DashboardComponent,
        path: 'horoscope',
        data: {
          breadcrumb: 'Horoscope'
          },
        canActivate: [AuthGuard],
        pathMatch: 'prefix',
        children: [
          {
            component: ManageComponent,
            path: 'manage',
            data: {
              breadcrumb: 'Manage Horroscope'
              },
            canActivate: [AuthGuard]
          },
          {
            component: UpdateDailyComponent,
            path: 'update-daily',
            data: {
              breadcrumb: 'Daily Update Horroscope'
              },
            canActivate: [AuthGuard]
          },
          {
            component: UpdateWeeklyComponent,
            path: 'update-weekly',
            data: {
              breadcrumb: 'Weekly Update Horroscope'
              },
            canActivate: [AuthGuard]
          },
          {
            component: UpdateMonthlyComponent,
            path: 'update-monthly',
            data: {
              breadcrumb: 'Monthly Update Horroscope'
              },
            canActivate: [AuthGuard]
          },
          {
            component: UpdateYearlyComponent,
            path: 'update-yearly',
            data: {
              breadcrumb: 'Yearly Update Horroscope'
              },
            canActivate: [AuthGuard]
          },
        ]
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
