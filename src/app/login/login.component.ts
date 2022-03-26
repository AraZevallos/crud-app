import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;
  name: string = '';

  loginForm!: FormGroup;
  constructor(public router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required])
      }
    )
  }

  onSubmit() {
    localStorage.setItem('user', this.loginForm.value['name']);
    this.router.navigate(['principal']);
  }

}
