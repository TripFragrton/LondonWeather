import { Component, OnInit } from '@angular/core';
import {hour, hourly,DataIn, WeatherInfoService} from "../services/weather-info.service";
import {SortEvent} from "primeng/api";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})


export class WeatherComponent implements OnInit {
  data: any;
  data2 :any;
  dataIn = {} as DataIn;
  dataOut : DataIn[]= [] ;
  constructor(private web: WeatherInfoService) {
    this.web.GetStatus().subscribe(x=>{
      this.data=x.hourly;
      this.data2 = this.weatherCode1(this.data);
    })

  }

  ngOnInit(): void {

  }

  weatherCode1(data: hour){

    for (let i = 0; i < data.time.length; i++) {
      this.dataOut[i]= {
          time1 :  data.time[i],
          temperature_2m :  data.temperature_2m[i],
          relativehumidity_2m : data.relativehumidity_2m[i],
          surface_pressure : data.surface_pressure[i],
          weathercode: this.switch(data.weathercode[i])
      }
    }
    return this.dataOut
  }



  switch(i:any){
    switch (i) {
      case 1:
        return 'Mainly clear';
        break;
      case 2:
        return 'Partly cloudy';
        break;
      case 3:
        return 'Overcast';
        break;
      case 45:
        return 'Fog';
        break;
      case 48:
        return 'Depositing rime fog';
        break;
      case 51:
        return 'Drizzle: light intensity';
        break;
      case 53:
        return 'Drizzle: moderate intensity';
      case 55:
        return 'Drizzle: dense intensity';
        break;
      case 56:
        return 'Freezing Drizzle: light intensity';
        break;
      case 57:
        return 'Freezing Drizzle: dense intensity';
        break;
      case 61:
        return 'Rain: slight intensity';
      case 63:
        return 'Rain: moderate intensity';
        break;
      case 65:
        return 'Rain: heavy intensity';
        break;
      case 66:
        return 'Freezing Rain: light intensity';
        break;
      case 67:
        return 'Freezing Rain: heavy intensity';
      case 71:
        return 'Snow fall: slight intensity';
        break;
      case 73:
        return 'Snow fall: moderate intensity';
        break;
      case 75:
        return 'Snow fall: heavy intensity';
        break;
      case 77:
        return 'Snow grains';
      case 80:
        return 'Rain showers: slight';
        break;
      case 81:
        return 'Rain showers: moderate';
        break;
      case 82:
        return 'Rain showers: violent';
        break;
      case 85:
        return 'Snow showers: slight';
        break;
      case 86:
        return 'Snow showers: heavy';
        break;
      case 95:
        return 'Thunderstorm: slight or moderate';
        break;
      case 96:
        return 'Thunderstorm with slight hail';
        break;
      case 99:
        return 'Thunderstorm with heavy hail';
        break;
      default:
        return 'Clear sky';
        break;
    }
  }

}
