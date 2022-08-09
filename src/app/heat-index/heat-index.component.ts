import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-heat-index',
  templateUrl: './heat-index.component.html',
  styleUrls: ['./heat-index.component.css']
})

export class HeatIndexComponent implements OnInit {
  stateOptions: any[];
  value1: string = "c";
  value2: number = 0;
  value3: string = "26.7°C";
  value4: string = "°C";
  inputTemp: boolean =false;
  inputTempInv:boolean =true;
  t :number =  0;
  t2 :number = 0;
  rh :number = 0;
  index: number = 0;
  changed:boolean = false;
  constructor(private router: Router) {  this.stateOptions = [{label: '°C', value: 'c'}, {label: '°F', value: 'f'}];}
  valueInvalid: string = "";
  chart: string= "true";
  ngOnInit(): void {

  }
  onSubmit() {

    this.getIndex();
    if (this.value2 >= 0) {
      this.inputTemp =false;
      this.inputTempInv = true;
    }else {
      this.inputTemp =true;
      this.inputTempInv = false;

    }
  }
  getIndex(){
    this.index = ( -42.379 + (2.04901523 * this.t) +
      (10.14333127 * this.rh) -
      (0.22475541 * this.t * this.rh) -
      (0.00683783 * this.t * this.t) -
      (0.05481717 * this.rh * this.rh ) +
      (0.00122874 * this.t * this.t * this.rh) +
      (0.00085282 * this.t * this.rh * this.rh ) -
      (0.00000199 * this.t * this.t * this.rh * this.rh ));
      this.convert();
  }
  changeToF(){
    if(this.value1=="c")
    {
      if (this.t >= 26.7 ){
        this.t = (1.8 * this.t + 32);
        this.changed = true;
      }
      this.value3 = "26.7°C";
      this.value4 = "°C";
    } else {
      if (this.changed ==true){
        this.t = (0.5556 * (this.t - 32));
        this.changed = false;
      }
      this.value3 = "80°F";
      this.value4 = "°F"
    }
  }
  convert(){
    if(this.value1=="c" )
    {
        this.value2 = (0.5556 * (this.index - 32));
    } else
      {
        this.value2 = this.index;
      }
  }
  update(temp: string,hum:string){

      this.valueInvalid = temp;
      if (temp != '')
      {
        this.t = parseInt(temp);
      }
    if (hum != '')
    {
      this.rh = parseInt(hum);
    }
  }
  gotoChart(){
    this.router.navigate(["/weather"],{state:{data:this.chart}});
  }
}
