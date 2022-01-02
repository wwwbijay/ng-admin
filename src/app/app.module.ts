import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';



import { AppComponent } from './app.component';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidemenuComponent } from './layout/sidemenu/sidemenu.component';
import { LoginComponent } from './login/login.component';
import { CpanelComponent } from './cpanel/cpanel.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { DashItemComponent } from './cpanel/dash-item/dash-item.component';

import { UpdateDailyComponent } from './horoscope/update-daily/update-daily.component';
import { UpdateMonthlyComponent } from './horoscope/update-monthly/update-monthly.component';
import { UpdateWeeklyComponent } from './horoscope/update-weekly/update-weekly.component';
import { UpdateYearlyComponent } from './horoscope/update-yearly/update-yearly.component';
import { DashboardComponent } from './horoscope/dashboard.component';
import { StatItemComponent } from './cpanel/stat-item/stat-item.component';
import { ChartComponent } from './cpanel/chart/chart.component'; 


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SidemenuComponent,
    LoginComponent,
    CpanelComponent,
    BreadcrumbsComponent,
    DashItemComponent,
    UpdateDailyComponent,
    UpdateMonthlyComponent,
    UpdateWeeklyComponent,
    UpdateYearlyComponent,
    DashboardComponent,
    StatItemComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
