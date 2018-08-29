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
    const url: String = 'http://localhost:8080/api/snack';
    return this.http.get<Snack[]>(url.toString(), {headers: httpHeaders}).toPromise();
  }

  findSnack(id: number): Promise<Snack>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://localhost:8080/api/snack/search';
    return this.http.post<Snack>(url.toString(),{id: id}, {headers: httpHeaders}).toPromise();
  }

  addSnack(name: string, price: number, owner: number, pictype: string, pic: string) {
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8', 'owner': owner.toString()});
    const url: String = 'http://localhost:8080/api/snack';
    return this.http.post<Snack>(url.toString(),{name: name, price: price, pictype: pictype, pic: pic}, {headers: httpHeaders}).toPromise();
  }

}
