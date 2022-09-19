import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/shared/models/login';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  disableBtn: boolean

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['kminchelle', Validators.required],
      password: ['0lelplR', Validators.required]
    })
  }

  submit(value: Login) {
    this.disableBtn = true;
    this.authService.login(value).subscribe(
      res => {        
        this.toastr.success('Logged in successfully!');
        this.router.navigate(['/home'])
      }, err => {
        // ENABLE BUTTON IN CASE OF INVALID CREDENTIALS
        this.disableBtn = false;
        this.toastr.error(err.error.message)
      }
    )
  }
}
