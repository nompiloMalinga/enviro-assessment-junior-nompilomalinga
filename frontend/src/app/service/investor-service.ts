import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Investor } from '../models/investor';

@Injectable({
  providedIn: 'root',
})
export class InvestorService {

  private baseUrl = 'http://localhost:8080/api/investors'

  constructor(private http :HttpClient){
  }

  loadInvestors(investor :Investor):Observable<Investor>{
    return this.http.post<Investor>(`${this.baseUrl}`,investor)
    .pipe(
       catchError((error) => {
           return throwError(() => new Error(error.error?.message || error.message ));
          })
      )

  }
  getInvestorPortfolio(id:number): Observable<Investor>{

    return this.http.get<Investor>(`${this.baseUrl}/${id}`)
    .pipe(
       catchError((error) => {
           return throwError(() => new Error(error.error?.message || error.message ));
          })
      )

  }

  getAllInvestors(): Observable<Investor[]> {
  return this.http.get<Investor[]>(`${this.baseUrl}/all`)
    .pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error?.message || error.message));
      })
    );
}
  
}
