import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./Views/Components/Navbar/navbar.component";
import {FooterbarComponent} from "./Views/Components/Footerbar/footerbar.component";
import {AuthenticationService} from "./Services/Authentication/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements  OnInit{
  title = 'Furijat';

  constructor(private authService : AuthenticationService, private router : Router) {

  }

  ngOnInit() {
    this.AutoLogin()
  }

  AutoLogin() {

    this.authService.currentIsLoggedIn.subscribe(res => console.log("auto login: " + res))

    this.authService.AutoCheckLogin().subscribe()
  }
}
