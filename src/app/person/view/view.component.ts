import {Component, Inject} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Person} from "../../models/person.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ContactService} from "../../services/contact.service";
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent {
  displayedColumns = ['is_favorite', 'type', 'value', 'actions'];
  dataSource!: MatTableDataSource<Person>;
  constructor(
    private _contactService: ContactService,
    private _personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.dataSource = new MatTableDataSource<any>(data.contacts);
  }

  toggleFavorite(id: number) {
    this._contactService.favoriteContact(id).subscribe({
      next: (res) => {
        this._personService.getPersonById(this.data.id).subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource<any>(res.data.contacts);
          }
        });
      }
    });
  }

  deleteContact(id: number) {
    this._contactService.deleteContact(id).subscribe({
      next: (res) => {
        this._personService.getPersonById(this.data.id).subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource<any>(res.data.contacts);
          }
        });
      }
    });
  }

}
