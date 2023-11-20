import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Person } from "../models/person.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PersonService {

  private url = environment.api;
  private name = '';
  private is_favorite = '';
  constructor(private httpClient: HttpClient) {
  }

  getPerson(): Observable<any> {
    return this.httpClient.get(this.url + '/person');
  }

  getPersonById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/person/' + id);
  }

  favoritePerson(id: number): Observable<any> {
    return this.httpClient.put(this.url + '/person/' + id + '/favorite/', {  });
  }

  storePerson(person: Person): Observable<any> {
    return this.httpClient.post(this.url + '/person', person);
  }

  updatePerson(id: number, person: Person): Observable<any> {
    return this.httpClient.patch(this.url + '/person/' + id, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/person/' + id);
  }

}
