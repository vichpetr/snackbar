import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions: TRANSACTION.ExpandedTransaction[];

  constructor(private http: HttpClient) { }

  getTransactions(id: number): Promise<TRANSACTION.ExpandedTransaction[]>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8', 'userId': id.toString()});
    const url: String = 'http://localhost:8080/api/transaction/my';
    return this.http.get<TRANSACTION.ExpandedTransaction[]>(url.toString(), {headers: httpHeaders}).toPromise();
  }

  addTransaction(buyer: number, snack: number) {
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://localhost:8080/api/transaction';
    console.log('buyer', buyer);
    console.log('snack', snack);
    return this.http.post<TRANSACTION.Transaction>(url.toString(),{buyerId: buyer, snackId: snack}, {headers: httpHeaders}).toPromise();
  }

  payTransactions(buyer: number, ids: number[]): Promise<TRANSACTION.ExpandedTransaction[]>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://localhost:8080/api/transaction/pay';
    return this.http.post<TRANSACTION.ExpandedTransaction[]>(url.toString(),{buyer, ids}, {headers: httpHeaders}).toPromise();
  }
}
