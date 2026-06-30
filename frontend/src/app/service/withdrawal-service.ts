import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Withdrawal, creatWithdrawal } from '../models/withdrawal';


@Injectable({
  providedIn: 'root',
})
export class WithdrawalService {

  private baseUrl = 'http://localhost:8080/api/withdrawals'

  constructor(private http : HttpClient){}


  processWithdrawal(withdrawal: creatWithdrawal ): Observable<Withdrawal>{
    return this.http.post<Withdrawal>(`${this.baseUrl}`,withdrawal)
      .pipe(
       catchError((error) => {
           return throwError(() => new Error(error.error?.message || error.message ));
          })
      )

  }

  getWithdrawalHistory(): Observable<Withdrawal[]>{
    return this.http.get<Withdrawal[]>(`${this.baseUrl}/history`)
      .pipe(
       catchError((error) => {
           return throwError(() => new Error(error.error?.message || error.message));
          })
      )

  }

exportCSV(investorId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${investorId}/export`, {
      responseType: 'blob'
    }).pipe(catchError((error) => {
           return throwError(() => new Error(error.error?.message || error.message));
          })
        )
  }


  
}
