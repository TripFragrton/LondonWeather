import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { HeatIndexComponent } from './heat-index/heat-index.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import {InputTextModule} from "primeng/inputtext";
import {SelectButtonModule} from "primeng/selectbutton";
import { WeatherComponent } from './weather/weather.component';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {ChartModule} from "primeng/chart";
import {ToggleButtonModule} from "primeng/togglebutton";
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HeatIndexComponent,
    WeatherComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    SelectButtonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    ChartModule,
    ToggleButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
