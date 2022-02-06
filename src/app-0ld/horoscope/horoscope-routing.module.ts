import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateYearlyComponent } from './update-yearly/update-yearly.component';
import { UpdateMonthlyComponent } from './update-monthly/update-monthly.component';
import { UpdateWeeklyComponent } from './update-weekly/update-weekly.component';
import { UpdateDailyComponent } from './update-daily/update-daily.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
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
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoroscopeRoutingModule { }
