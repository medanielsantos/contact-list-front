import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../../services/person.service";
import {Observable} from "rxjs";
import {Person} from "../../models/person.model";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit{

  person$ = new Observable<Person[]>();

  personForm: FormGroup
  constructor(
    private _personService: PersonService,
    private _formBuilder: FormBuilder,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
) {

    this.personForm = this._formBuilder.group({
      name: ['', Validators.required],
      is_favorite: false
    });
  }

  ngOnInit(): void {
    this.personForm.patchValue(this.data);
  }

  storePerson() {
    if (this.personForm.invalid) {
      return;
    }

    if(this.data) {
      this.updatePerson();
      return;
    }

    this._personService.storePerson(this.personForm.value).subscribe({
      next: (res) => {
        this.person$ = this._personService.getPerson();
        this._dialog.closeAll();
      }
    });
  }

  updatePerson() {
    if (this.personForm.invalid) {
      return;
    }

    this._personService.updatePerson(this.data.id, this.personForm.value).subscribe({
      next: (res) => {
        this.person$ = this._personService.getPerson();
        this._dialog.closeAll();
      }
    });
  }

}
