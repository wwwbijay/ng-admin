import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoroscopeRoutingModule } from './horoscope-routing.module';

import { UpdateYearlyComponent } from './update-yearly/update-yearly.component';
import { UpdateMonthlyComponent } from './update-monthly/update-monthly.component';
import { UpdateWeeklyComponent } from './update-weekly/update-weekly.component';
import { UpdateDailyComponent } from './update-daily/update-daily.component';
import { DashboardComponent } from './dashboard.component';
import { ManageTableComponent } from './layout/manage-table/manage-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UpdateDailyComponent,
    UpdateWeeklyComponent,
    UpdateMonthlyComponent,
    UpdateYearlyComponent,
    ManageTableComponent,
  ],
  imports: [
    CommonModule,
    HoroscopeRoutingModule
  ]
})
export class HoroscopeModule { }
