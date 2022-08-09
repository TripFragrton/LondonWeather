import { Component, OnInit } from '@angular/core';
import {hour, hourly,DataIn, WeatherInfoService} from "../services/weather-info.service";
import {formatDate} from "@angular/common";



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})


export class WeatherComponent implements OnInit {
  data = {} as hour;
  data2 : DataIn[]=[];
  history  = {} as hour;
  dataIn = {} as DataIn;
  dataOut : DataIn[]= [] ;
  dataOutHis : DataIn[]= [] ;
  dataHistory : DataIn[]= [] ;
  dataPresent : DataIn[]= [] ;
  oldData = {} as hour;
  stateOptions: any[];
  stateOptionsC: any[];
  valueTab: string = "true";
  valueChar: string = "t";
  isShownHisTab :boolean = true;
  isShownPisTab :boolean = false;
  isShownHisCha :boolean = true;
  isShownPisCha :boolean = true;
  isTabSw :boolean = false;
  isCharSw :boolean = true;
  weather :boolean = true;
  chart :boolean = false;
  index :boolean = true;

  constructor(private web: WeatherInfoService) {
    this.data.time=[];
    this.data.temperature_2m=[];
    this.data.relativehumidity_2m=[];
    this.data.surface_pressure=[];
    this.data.weathercode=[];
    this.history.time=[];
    this.history.temperature_2m=[];
    this.history.relativehumidity_2m=[];
    this.history.surface_pressure=[];
    this.history.weathercode=[];

    this.web.GetStatus().subscribe(x=>{
      this.history = this.historical(x.hourly);
      this.data = this.present(x.hourly);
      this.dataPresent = this.formatDat(this.data,this.dataOut);
      this.dataHistory = this.formatDat(this.history,this.dataOutHis);
    })
    this.stateOptions = [{label: 'Present', value: 'true'}, {label: 'History', value: 'false'}];
    this.stateOptionsC = [{label: 'Present', value: 't'}, {label: 'History', value: 'f'}];
  }

  ngOnInit(): void {
    if (history.state.data =="true"){
      this.isShownHisTab = true;
      this.isShownPisTab = true;
      this.isShownPisCha = false;
      this.isShownHisCha = true;
      this.isCharSw = false;
      this.isTabSw = true;
    }

  }
  historical(data:hour){
    for (let y = 0; y < 167 ; y++) {
      this.history.time[y] = data.time[y];
      this.history.temperature_2m[y] = data.temperature_2m[y];
      this.history.relativehumidity_2m[y] = data.relativehumidity_2m[y];
      this.history.surface_pressure[y] = data.surface_pressure[y];
      this.history.weathercode[y] = data.weathercode[y];
    }
    return this.history;
  }
  present(data:hour){
    for (let y = 168; y < data.time.length ; y++) {
      this.data.time[y-168] = data.time[y];
      this.data.temperature_2m[y-168] = data.temperature_2m[y];
      this.data.relativehumidity_2m[y-168] = data.relativehumidity_2m[y];
      this.data.surface_pressure[y-168] = data.surface_pressure[y];
      this.data.weathercode[y-168] = data.weathercode[y];
    }
    return this.data;
  }
  formatDat(data:hour,datass:DataIn[]){
    var re = /t/gi;
    var str = " ";
    var newstr = str.replace(re, " ");
    for (let i = 0; i < data.time.length ; i++) {
      str = data.time[i];
      newstr = str.replace(re, " ");
      datass[i]= {
          time1 :  newstr,
          temperature_2m :  data.temperature_2m[i]+ " °C",
          relativehumidity_2m : data.relativehumidity_2m[i]+ " %",
          surface_pressure : data.surface_pressure[i]+ " hPa",
          weathercode: this.switch(data.weathercode[i])
      }
    }
    return datass
}
  changeToTab(){
    this.isShownPisCha = true;
    this.isShownHisCha = true;
    this.isCharSw = true;
    this.isTabSw = false;
    if (this.valueTab =="true"){
      this.isShownHisTab = true;
      this.isShownPisTab =false;
    } else
    {
      this.isShownHisTab = false;
      this.isShownPisTab =true;
    }
  }
  changeToChar(){
    this.isShownHisTab = true;
    this.isShownPisTab = true;
    this.isCharSw = false;
    this.isTabSw = true;
    if (this.valueChar =="t"){
      this.isShownHisCha = true;
      this.isShownPisCha =false;
    } else
    {
      this.isShownHisCha = false;
      this.isShownPisCha =true;
    }
  }
  switch(i:number){
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
