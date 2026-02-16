import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/Authentication/authentication.service";
import {UserPanelComponent} from "../../components/ProfilePanels/UserPanel/user-panel.component";
import {NgIf} from "@angular/common";
import {AdminPanelComponent} from "../../components/ProfilePanels/AdminPanel/admin-panel.component";
import {Router} from "@angular/router";
import {User} from "../../../data/models/User";
import {UserTypeEnum} from "../../../data/enums/userTypeEnum";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    UserPanelComponent,
    NgIf,
    AdminPanelComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit{
  showuserpanel : boolean = false
  showadminpanel : boolean = false
  user = {} as User

  constructor(private router : Router, private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.GetUserType()
  }

  Logout() {
    let check : boolean = this.authService.Logout()
    if (check) {
      this.router.navigate(['/'])
    }
  }
   GetUserType() {
    this.authService.GetActiveUser().subscribe( userdatares => {
      this.user = userdatares
      if (this.user.userType == UserTypeEnum.User) {
        this.showadminpanel = false
        this.showuserpanel = true
      }
      else if (this.user.userType == UserTypeEnum.Admin) {
        this.showadminpanel = true
        this.showuserpanel = false
      }
      else {
        this.showadminpanel = false
        this.showuserpanel = false
      }
    })

  }

}
