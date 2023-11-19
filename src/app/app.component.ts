import { Component } from '@angular/core';
import {environment} from "../environments/environment";
import {PersonService} from "./services/person.service";
import {Person} from "./models/person.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contact-app';

  people: Person[] = [];

  constructor(private personService: PersonService) {
    this.getPersonList();
  }

  getPersonList() {
    this.personService.getPerson().subscribe({
      next: (res) => {
        this.people = res.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  protected readonly console = console;
}
