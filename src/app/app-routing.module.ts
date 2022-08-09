import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeatIndexComponent} from "./heat-index/heat-index.component";
import {WeatherComponent} from "./weather/weather.component";
import {ChartComponent} from "./chart/chart.component";

const routes: Routes = [
  {
  path: 'heat-index',
  component: HeatIndexComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  },
  {path: '**', redirectTo: '/heat-index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
