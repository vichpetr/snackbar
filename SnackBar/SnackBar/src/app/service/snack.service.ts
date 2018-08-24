import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Snack} from "../model/snack";

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  snacks: Snack[];
  selectedSnack: Snack;

  constructor(private http: HttpClient) { }

  getSnacks(): Promise<Snack[]>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://emily.tmcz.cz:8080/api/snack/all';
    return this.http.post<Snack[]>(url.toString(),{}, {headers: httpHeaders}).toPromise();
  }

  findSnack(id: number): Promise<Snack>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://emily.tmcz.cz:8080/api/snack';
    return this.http.post<Snack>(url.toString(),{id: id}, {headers: httpHeaders}).toPromise();
  }

  addSnack(name: string, price: number, owner: number, pictype: string, pic: string) {
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://emily.tmcz.cz:8080/api/snack/add';
    return this.http.post<Snack>(url.toString(),{name: name, price: price, owner: owner, pictype: pictype, pic: pic}, {headers: httpHeaders}).toPromise();
  }

}
