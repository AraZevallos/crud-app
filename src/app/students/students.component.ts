import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  school: string;
  code: string;
  actions?: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  displayedColumns: string[] = ['id', 'first', 'last', 'email', 'school', 'code', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.api.requestGetStudents().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  editStudent(row: any) {
    const dialogRef = this.dialog.open(DialogComponent, { width: '30%', data: row });
    dialogRef.afterClosed().subscribe((result => {
      this.getStudents();
    }));
  }

  deleteStudent(id: number) {
    this.api.requestDeleteStudent(id)
      .subscribe((res) => {
        alert(res[0].message);
        this.getStudents();
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { width: '30%' });
    dialogRef.afterClosed().subscribe((result => {
      this.getStudents();
    }));
  }
}
