import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from "rxjs";
import {formatDate} from "@angular/common";



export interface hourly {
  hourly: hour;
}
export interface hour {
  time :[],
  temperature_2m:[],
  relativehumidity_2m:[],
  surface_pressure:[],
  weathercode:[]
}
export interface DataIn {
  time1 : string,
  temperature_2m: string,
  relativehumidity_2m: string,
  surface_pressure: string,
  weathercode: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherInfoService {
  apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&hourly=temperature_2m,relativehumidity_2m,surface_pressure,weathercode' ;

  constructor(private http: HttpClient) { }

  GetStatus(): Observable<hourly>{
    return  this.http.get<hourly>(this.apiUrl+ '&past_days=7')
      .pipe(retry(1), catchError(this.errorHandl));
  }


  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    return throwError(() => {
      return errorMessage;
    });
  }

}
