import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {PersonService} from "./services/person.service";
import {Person} from "./models/person.model";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StoreComponent} from "./person/store/store.component";
import {ViewComponent} from "./person/view/view.component";


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

  constructor(
    private dialog: MatDialog,
    private personService: PersonService
  ) {
    this.getPersonList();
  }

  ngOnInit() {
    this.getPersonList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPersonList() {
    this.personService.getPerson().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.dataSource.paginator = this.paginator;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getPersonById(id: number) {
    this.personService.getPersonById(id).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.dataSource.paginator = this.paginator;
      }
    });
    }


  toggleFavorite(id: number) {
    this.personService.favoritePerson(id).subscribe({
      next: (res) => {
        this.getPersonList();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addPerson() {
    const openDialog = this.dialog.open(StoreComponent, {
      width: '500px',
    });

    this.openAfterModal(openDialog);
  }

  updatePerson(id: number) {
    this.personService.getPersonById(id).subscribe({
      next: (res) => {
        const openDialog = this.dialog.open(StoreComponent, {
          width: '500px',
          data: res.data
        });

        this.openAfterModal(openDialog);
      }
    });
  }

  showDetails(id: number) {
    this.personService.getPersonById(id).subscribe({
      next: (res) => {
        const openDialog = this.dialog.open(ViewComponent, {
          width: '700px',
          data: res.data
        });
      }
    });
  }

  private openAfterModal(openDialog: MatDialogRef<StoreComponent, any>) {
    openDialog.afterClosed().subscribe({
      next: () => {
        this.personService.getPerson().subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource<any>(res.data);
            this.dataSource.paginator = this.paginator;
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  deletePerson(id: number) {
    this.personService.deletePerson(id).subscribe({
      next: (res) => {
        this.getPersonList();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  protected readonly console = console;
}
