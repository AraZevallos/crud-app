import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  studentForm!: FormGroup;
  title: string = 'Agregar Estudiante';
  buttonText: string = 'Guardar Datos';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      school: ['', Validators.required],
      code: ['', Validators.required],
    })
    if (this.editData) {
      this.title = 'Editar Estudiante';
      this.buttonText = 'Actualizar Datos';
      this.studentForm.controls['first_name'].setValue(this.editData.first_name);
      this.studentForm.controls['last_name'].setValue(this.editData.last_name);
      this.studentForm.controls['email'].setValue(this.editData.email);
      this.studentForm.controls['school'].setValue(this.editData.school);
      this.studentForm.controls['code'].setValue(this.editData.code);
    }
  }

  addStudent() {
    if (!this.editData) {
      if (this.studentForm.valid) {
        console.log(this.studentForm.value);
        this.api.requestPostStudent(this.studentForm.value)
          .subscribe((res) => {
            alert(res[0].message);
            this.studentForm.reset();
            this.dialogRef.close();
          });
      }
    }
    else {
      this.updateStudent();
    }
  }

  updateStudent() {
    this.api.requestPutStudent(this.editData.id, this.studentForm.value)
      .subscribe((res) => {
        alert(res[0].message);
        this.studentForm.reset();
        this.dialogRef.close();
      })
  }
}
