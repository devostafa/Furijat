import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../../Services/Authentication/authentication.service";
import {NgClass} from "@angular/common";
import {style} from "@angular/animations";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  authstatus : string = ""
  isLoggedIn: boolean = false
  IsMobileMenuOpen: boolean = false
  @ViewChild('MobileMenu') mobileMenuElement : ElementRef = {} as ElementRef
  leftCSSProperty : string = '-1000px'

  constructor(private router: Router, private authservice : AuthenticationService) {

  }

  ngOnInit() {
    this.authservice.currentIsLoggedIn.subscribe(res => this.isLoggedIn = res)
    this.authservice.currentAuthStatus.subscribe(res => this.authstatus = res)
  }

  GoHome() {
    this.router.navigate([''])
  }

  OpenMobileMenu(){
    if (this.leftCSSProperty === '0') {
      this.leftCSSProperty = '-1000px'
    }
    else {
      this.leftCSSProperty = '0'
    }
  }

  protected readonly style = style;
}
