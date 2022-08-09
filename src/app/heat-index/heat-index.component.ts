import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-heat-index',
  templateUrl: './heat-index.component.html',
  styleUrls: ['./heat-index.component.css']
})

export class HeatIndexComponent implements OnInit {
  stateOptions: any[];
  value1: string = "c";
  value2: string = "";
  value3: string = "26.7°C";
  value4: string = "°C";
  t :number =  0;
  t2 :number = 0;
  rh :number = 0;
  index: number = 0;
  changed:boolean = false;
  constructor() {  this.stateOptions = [{label: '°C', value: 'c'}, {label: '°F', value: 'f'}];}

  ngOnInit(): void {

  }
  onSubmit() {
    this.getIndex();
  }

  getIndex(){

    this.index = ( - 42.379 + (2.04901523 * this.t) + (10.14333127 * this.rh) - (0.22475541 * this.t * this.rh) -
      (6.83783 * 0.001 * this.t*this.t) - (5.481717 * 0.01 * this.rh*this.rh ) + (1.22874 * 0.001 * this.t*this.t * this.rh) +
      (8.5282 * 0.0001 * this.t * this.rh*this.rh ) - (1.99 * 0.000001 * this.t * this.t * this.rh*this.rh ));
    console.log(this.index);

      this.convert();

  }

  changeToF(){

    if(this.value1=="c")
    {
      if (this.t >= 26.7 ){
        this.t = ((9/5) * this.t + 32);
        this.changed = true;
      } else {
        //this.value1 = "low temperature";
        //return;
      }
      this.value3 = "26.7°C";
      this.value4 = "°C";
    } else {
      if (this.changed ==true){
        this.t = ((5/9) * (this.t - 32));
        this.changed = false;
      }
      this.value3 = "80°F";
      this.value4 = "°F"
    }
    console.log(this.t);
  }
  convert(){
    if(this.value1=="c" )
    {
      this.value2 = ((5/9) * (this.index - 32)).toString();

    } else {
      this.value2 = this.index.toString();
    }
  }
  update(temp: string,hum:string){
      if (temp != ''){
        this.t = parseInt(temp);
      }
    if (hum != ''){
      this.rh = parseInt(hum);
    }

  }

}