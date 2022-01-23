import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { CKEditorModule } from 'ckeditor4-angular';


import { HoroscopeRoutingModule } from './horoscope-routing.module';

import { UpdateYearlyComponent } from './update-yearly/update-yearly.component';
import { UpdateMonthlyComponent } from './update-monthly/update-monthly.component';
import { UpdateWeeklyComponent } from './update-weekly/update-weekly.component';
import { UpdateDailyComponent } from './update-daily/update-daily.component';
import { DashboardComponent } from './dashboard.component';
import { ManageTableComponent } from './layout/manage-table/manage-table.component';
import { DailyTableComponent } from './layout/daily-table/daily-table.component';
import { CreateSignComponent } from './dialogs/create-sign/create-sign.component';
import { EditSignComponent } from './dialogs/edit-sign/edit-sign.component';
import { DeleteSignComponent } from './dialogs/delete-sign/delete-sign.component';
import { NewDailyComponent } from './dialogs/new-daily/new-daily.component';
import { EditDailyComponent } from './dialogs/edit-daily/edit-daily.component';
import { DeleteDailyComponent } from './dialogs/delete-daily/delete-daily.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UpdateDailyComponent,
    UpdateWeeklyComponent,
    UpdateMonthlyComponent,
    UpdateYearlyComponent,
    ManageTableComponent,
    DailyTableComponent,
    CreateSignComponent,
    EditSignComponent,
    DeleteSignComponent,
    NewDailyComponent,
    EditDailyComponent,
    DeleteDailyComponent,
  ],
  imports: [
    CommonModule,
    HoroscopeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatSelectModule,
    CKEditorModule
  ]
})

export class HoroscopeModule { }
