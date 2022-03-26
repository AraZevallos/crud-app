import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from '../students/students.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  requestGetStudents() {
    return this.http.get<Student[]>(environment.API_URL + 'Student');
  }

  requestPostStudent(data: any) {
    return this.http.post<any>(environment.API_URL + 'Student', data);
  }

  requestPutStudent(id: number, data: any) {
    return this.http.put<any>(environment.API_URL + 'Student/' + id, data);
  }

  requestDeleteStudent(id: number) {
    return this.http.delete<any>(environment.API_URL + 'Student/' + id);
  }
}
