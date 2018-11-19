import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {TransactionList} from "../model/transactionList";


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions: TransactionList;

  constructor(private http: HttpClient) {
  }

  getTransactions(id: number, paidVisible: boolean): Promise<TransactionList> {
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8', 'userId': id.toString()});
    const url: String = environment.url + '/api/transaction/my?paid=' + paidVisible;
    return this.http.get<TransactionList>(url.toString(), {headers: httpHeaders}).toPromise();
  }

  addTransaction(buyer: number, snack: number) {
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = environment.url + '/api/transaction';
    return this.http.post<TRANSACTION.Transaction>(url.toString(), {buyerId: buyer, snackId: snack}, {headers: httpHeaders}).toPromise();
  }

  payTransactions(buyer: number, ids: number[]): Promise<TransactionList> {
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = environment.url + '/api/transaction/pay';
    return this.http.post<TransactionList>(url.toString(), {buyer, ids}, {headers: httpHeaders}).toPromise();
  }
}
