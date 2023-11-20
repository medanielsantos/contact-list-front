import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Person } from "../models/person.model";
import {Observable} from "rxjs";
import {Contact} from "../models/contact.model";

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

  getContactById(id: number): Observable<any> {
    return this.httpClient.get(this.url + id);
  }

  storeContact(contact: Contact): Observable<any> {
    return this.httpClient.post(this.url , contact);
  }

  updateContact(id: number, contact: Contact): Observable<any> {
    return this.httpClient.patch(this.url + id, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.httpClient.delete(this.url + id);
  }

}
