import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions: TRANSACTION.ExpandedTransaction[];

  constructor(private http: HttpClient) { }

  getTransactions(id: number): Promise<TRANSACTION.ExpandedTransaction[]>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://emily.tmcz.cz:8080/api/transaction/';
    return this.http.post<TRANSACTION.ExpandedTransaction[]>(url.toString(),{id: id}, {headers: httpHeaders}).toPromise();
  }

  findTransaction(id: number): Promise<TRANSACTION.Transaction[]>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://emily.tmcz.cz:8080/api/transaction';
    return this.http.post<TRANSACTION.Transaction[]>(url.toString(),{id: id}, {headers: httpHeaders}).toPromise();
  }

  addTransaction(buyer: number, snack: number) {
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://emily.tmcz.cz:8080/api/transaction/add';
    return this.http.post<TRANSACTION.Transaction>(url.toString(),{buyer: buyer, snack: snack}, {headers: httpHeaders}).toPromise();
  }

  payTransactions(buyer: number, ids: number[]): Promise<TRANSACTION.ExpandedTransaction[]>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://emily.tmcz.cz:8080/api/transaction/pay';
    return this.http.post<TRANSACTION.ExpandedTransaction[]>(url.toString(),{buyer, ids}, {headers: httpHeaders}).toPromise();
  }
}
