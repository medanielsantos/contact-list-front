import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Person} from "../../models/person.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../../services/person.service";
import {ContactService} from "../../services/contact.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Contact} from "../../models/contact.model";

@Component({
  selector: 'app-store-person-contact',
  templateUrl: './store-contact.component.html',
  styleUrls: ['./store-contact.component.css']
})
export class StoreContactComponent implements OnInit{

  person$ = new Observable<Person[]>();
  contact$ = new Observable<Contact[]>();

  contactForm: FormGroup

  constructor(
    private _personService: PersonService,
    private _contactService: ContactService,
    private _formBuilder: FormBuilder,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
) {
    this.contactForm = this._formBuilder.group({
      person_id: [this.data?.id, Validators.required],
      type: ['', Validators.required],
      value: ['', Validators.required],
      is_favorite: false
    });
  }

  ngOnInit(): void {
    this.contactForm.patchValue(this.data);
  }
  storeContact() {
    if (this.contactForm.invalid) {
      return;
    }

    if(this.data) {
      this.updateContact();
      return;
    }

    this._contactService.storeContact(this.contactForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.person$ = this._personService.getPerson();
        this._dialog.closeAll();
      }

    });
  }

  updateContact() {
    if (this.contactForm.invalid) {
      return;
    }

    this._contactService.updateContact(this.data.id, this.contactForm.value).subscribe({
      next: (res) => {
        this.contact$ = this._contactService.getContactById(this.data.id);
        this._dialog.closeAll();
      }
    });
  }
}
