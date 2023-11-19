import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Person } from "../models/person.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private url = environment.api + '/contacts/';
  private id_person = '';
  private type = '';
  private value = '';
  private is_favorite = '';
  constructor(private httpClient: HttpClient) {
  }
  favoriteContact(id: number): Observable<any> {
    return this.httpClient.put(this.url + id + '/favorite/', {  });
  }

  storePerson(person: Person): Observable<any> {
    return this.httpClient.post(this.url , person);
  }

  updatePerson(id: number, person: Person): Observable<any> {
    return this.httpClient.patch(this.url + id, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.httpClient.delete(this.url + id);
  }

}
