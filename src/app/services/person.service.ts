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
  constructor(private httpClient: HttpClient) {
  }

  getPerson(): Observable<any> {
    return this.httpClient.get(this.url + '/person');
  }

}
