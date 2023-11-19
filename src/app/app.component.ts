import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {environment} from "../environments/environment";
import {PersonService} from "./services/person.service";
import {Person} from "./models/person.model";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
    'is_favorite',
    'name',
    'actions'
  ];

  dataSource!: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personService: PersonService) {
    this.getPersonList();
  }

  ngOnInit() {
    this.getPersonList();
  }

  getPersonList() {
    this.personService.getPerson().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.dataSource.paginator = this.paginator;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(this.dataSource);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  protected readonly console = console;
}
