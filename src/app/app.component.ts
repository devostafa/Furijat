import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./views/components/Navbar/navbar.component";
import {FooterbarComponent} from "./views/components/Footerbar/footerbar.component";
import {AuthenticationService} from "./services/Authentication/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements  OnInit{
  title = 'Furijat';

  constructor(private authService : AuthenticationService, private router : Router) {}

  ngOnInit() {
    this.AutoLogin()
  }

  AutoLogin() {
    this.authService.AutoCheckLogin().subscribe()
  }
}
