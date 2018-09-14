import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
// import { Http, RequestOptions } from '@angular/http';
// import { map } from 'rxjs/operators';
import { map, filter, catchError, mergeMap,  } from 'rxjs/operators';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) { }
  getData(time, code):Observable<any> {
      if(time == '') {
        return this.http.get('https://api.iextrading.com/1.0/stock/'+code+'/chart')
      }
      console.log('https://api.iextrading.com/1.0/stock/'+code+'/chart/'+time)
      return this.http.get('https://api.iextrading.com/1.0/stock/'+code+'/chart/'+time)
      .pipe(
        // map((res:Response)=> res.json()),
        catchError((e:Response)=> throwError(e))
      )
      }
  getLogo(code):Observable<any> {
    return this.http.get('https://api.iextrading.com/1.0/stock/'+code+'/logo');
  }
}