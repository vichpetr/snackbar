import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Avatar} from "../model/avatar";
import {Link} from "../model/link";


@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  selectedAvatar: Avatar;
  avatars: Avatar[];

  constructor(private http: HttpClient) { }

  getAvatars(): Promise<Avatar[]>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://localhost:8080/api/avatar/';
    return this.http.get<Avatar[]>(url.toString(),{headers: httpHeaders}).toPromise();
  }

  getAvatar(link: Link): Promise<Avatar>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    return this.http.get<Avatar>(link.href, {headers: httpHeaders}).toPromise();
  }

  findAvatar(id: number): Promise<Avatar>{
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://localhost:8080/api/avatar/' + id;
    return this.http.get<Avatar>(url.toString(), {headers: httpHeaders}).toPromise();
  }

  addAvatar(name: string, email: string, pictype: string, pic: string) {
    const httpHeaders = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const url: String = 'http://localhost:8080/api/avatar';
    return this.http.post<Avatar>(url.toString(),{name: name, email: email, pictype: pictype, pic: pic}, {headers: httpHeaders}).toPromise();
  }
}
