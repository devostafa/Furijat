import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/Authentication/authentication.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-register-page.component.html',
  styleUrl: './login-register-page.component.scss'
})
export class LoginRegisterPageComponent {

  public Loginform : boolean = true
  public Registerform : boolean = false
  public status : string = "Register"

  constructor(private authService : AuthenticationService, private router : Router) {
  }

  loginform = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  registerformm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  SwitchForm() {
    if (this.status == "Register") {
      this.status = "Login"
      this.Loginform = false
      this.Registerform = true
    }
    else {
      this.status = "Register"
      this.Loginform = true
      this.Registerform = false
    }
  }

   async Login() {
     this.loginform.markAllAsTouched()
    if (this.loginform.valid) {
      let loginrequst = {username: this.loginform.get('username').value, password: this.loginform.get('password').value}
      this.authService.Login(loginrequst).subscribe(res => {
        if (res) {
          this.router.navigate(["profile"])
        }
        else {

          Swal.fire({
            title: "Error Login",
            text: "Username Or Password wrong"
          })
        }
      })
    }
    else {
      this.loginform.markAllAsTouched()
    }
  }


  Register() {
    this.registerformm.markAllAsTouched()
    if (this.registerformm.valid) {
      const registereq = {
        username: this.registerformm.controls.username.value,
        password: this.registerformm.controls.password.value,
        email: this.registerformm.controls.email.value
      }
      this.authService.Register(registereq).subscribe(res => {
        if (res) {
          this.router.navigate(["profile"])
        }
        else {
          Swal.fire({
            title: "Error Register",
            text: "Registering an account has failed"
          })
        }
      })
    }
    else {

    }
  }

}
