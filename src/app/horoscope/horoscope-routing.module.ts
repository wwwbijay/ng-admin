import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateWeeklyComponent } from './update-weekly/update-weekly.component';
import { UpdateDailyComponent } from './update-daily/update-daily.component';
import { AuthGuard } from '../auth/auth.guard';
import { EngMonthlyComponent } from './update-monthly/eng/eng.component';
import { NepMonthlyComponent } from './update-monthly/nep/nep.component';
import { EngYearlyComponent } from './update-yearly/eng/eng.component';
import { NepYearlyComponent } from './update-yearly/nep/nep.component';

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
      component: EngMonthlyComponent,
      path: 'update-monthly',
      data: {
        breadcrumb: 'Monthly Update Horroscope '
      },
      canActivate: [AuthGuard],
      children: [
        {
          component: NepMonthlyComponent,
          path: 'np',
          data: {
            breadcrumb: 'Nepali'
          },
          canActivate: [AuthGuard],
        }
      ]
    },
    {
      component: EngYearlyComponent,
      path: 'update-yearly',
      data: {
        breadcrumb: 'Yearly Update Horroscope'
      },
      canActivate: [AuthGuard],
      children: [
        {
          component: NepYearlyComponent,
          path: 'np',
          data: {
            breadcrumb: 'Nepali'
          },
          canActivate: [AuthGuard],
        }
      ]
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoroscopeRoutingModule { }
