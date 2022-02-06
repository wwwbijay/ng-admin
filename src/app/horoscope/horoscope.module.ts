import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { CKEditorModule } from 'ckeditor4-angular';
import {DragDropModule} from '@angular/cdk/drag-drop';


import { HoroscopeRoutingModule } from './horoscope-routing.module';

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
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { NewWeeklyComponent } from './dialogs/new-weekly/new-weekly.component';
import { EditWeeklyComponent } from './dialogs/edit-weekly/edit-weekly.component';
import { DeleteWeeklyComponent } from './dialogs/delete-weekly/delete-weekly.component';
import { EngMonthlyComponent } from './update-monthly/eng/eng.component';
import { NepMonthlyComponent } from './update-monthly/nep/nep.component';
import { NewMonthlyEngComponent } from './dialogs/new-monthly-eng/new-monthly-eng.component';
import { NewMonthlyNepComponent } from './dialogs/new-monthly-nep/new-monthly-nep.component';
import { EditMonthlyNepComponent } from './dialogs/edit-monthly-nep/edit-monthly-nep.component';
import { EditMonthlyEngComponent } from './dialogs/edit-monthly-eng/edit-monthly-eng.component';
import { DeleteMonthlyEngComponent } from './dialogs/delete-monthly-eng/delete-monthly-eng.component';
import { DeleteMonthlyNepComponent } from './dialogs/delete-monthly-nep/delete-monthly-nep.component';
import { NepYearlyComponent } from './update-yearly/nep/nep.component';
import { EngYearlyComponent } from './update-yearly/eng/eng.component';
import { DeleteYearlyEngComponent } from './dialogs/delete-yearly-eng/delete-yearly-eng.component';
import { DeleteYearlyNepComponent } from './dialogs/delete-yearly-nep/delete-yearly-nep.component';
import { EditYearlyNepComponent } from './dialogs/edit-yearly-nep/edit-yearly-nep.component';
import { EditYearlyEngComponent } from './dialogs/edit-yearly-eng/edit-yearly-eng.component';
import { NewYearlyEngComponent } from './dialogs/new-yearly-eng/new-yearly-eng.component';
import { NewYearlyNepComponent } from './dialogs/new-yearly-nep/new-yearly-nep.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UpdateDailyComponent,
    UpdateWeeklyComponent,
    ManageTableComponent,
    DailyTableComponent,
    CreateSignComponent,
    EditSignComponent,
    DeleteSignComponent,
    NewDailyComponent,
    EditDailyComponent,
    DeleteDailyComponent,
    TopNavComponent,
    NewWeeklyComponent,
    EditWeeklyComponent,
    DeleteWeeklyComponent,
    EngMonthlyComponent,
    NepMonthlyComponent,
    NewMonthlyEngComponent,
    NewMonthlyNepComponent,
    EditMonthlyNepComponent,
    EditMonthlyEngComponent,
    DeleteMonthlyEngComponent,
    DeleteMonthlyNepComponent,
    NepYearlyComponent,
    EngYearlyComponent,
    DeleteYearlyEngComponent,
    DeleteYearlyNepComponent,
    EditYearlyNepComponent,
    EditYearlyEngComponent,
    NewYearlyEngComponent,
    NewYearlyNepComponent,
  ],
  imports: [
    CommonModule,
    HoroscopeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatSelectModule,
    CKEditorModule,
    DragDropModule
  ]
})

export class HoroscopeModule { }
