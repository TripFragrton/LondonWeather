import {Component, Input, OnInit} from '@angular/core';
import {WeatherComponent} from "../weather/weather.component";
import {DataIn, hour, WeatherInfoService} from "../services/weather-info.service";



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  @Input()dataChar = {} as hour;

  constructor(private web: WeatherInfoService) {
    this.web.GetStatus().subscribe(x => {
      this.basicData1()
    })
  }
  ngOnInit(): void {

  }
  basicData1(){
    this.basicData = {
      labels: this.dataChar.time,
      datasets: [
        {
          label: 'Temperature',
          data: this.dataChar.temperature_2m,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
      ]
    };

  }


}
