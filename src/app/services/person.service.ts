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

  favoritePerson(id: number): Observable<any> {
    return this.httpClient.put(this.url + '/person/' + id + '/favorite/', { id });
  }

  editPerson(id: number): Observable<any> {
    return this.httpClient.patch(this.url + '/person/' + id, {
      name: this.name,
      is_favorite: this.is_favorite
    });
  }

  deletePerson(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/person/' + id);
  }

}
