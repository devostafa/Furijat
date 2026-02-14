import {Routes} from '@angular/router';
import {HomePageComponent} from "./views/pages/Home/home-page.component";
import {ProfilePageComponent} from "./views/pages/Profile/profile-page.component";
import {ProjectsPageComponent} from "./views/pages/Projects/projects-page.component";
import {ProjectViewComponent} from "./views/pages/ProjectView/project-view.component";
import {LoginRegisterPageComponent} from "./views/pages/LoginRegister/login-register-page.component";
import {DonationPageComponent} from "./views/pages/Donation/donation-page.component";
import {profileguardGuard} from "./utilities/ProfileGuard/profileguard.guard";
import {
  AdminprofileviewPageComponent
} from "./views/components/ProfilePanels/AdminPanel/AdminProjectView/adminprofileview-page.component";
import {underconstructionGuard} from "./utilities/UnderConstructionRouteGuard/underconstruction.guard";

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'loginregister', component: LoginRegisterPageComponent },
  //RE-ROUTE AFTER SUCCESSFUL DONATION
  { path: 'viewproject/:id', component: ProjectViewComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [underconstructionGuard]  },
  { path: 'admin/view/:id', component: AdminprofileviewPageComponent, canActivate: [underconstructionGuard]  },
  { path: 'donation/:id', component: DonationPageComponent, canActivate: [profileguardGuard]  },
  { path: 'donation/:id/success', component: ProjectViewComponent },
  { path: 'news/:id', component: ProjectViewComponent }, // Added this as it's used in home-page.component.html
  { path: 'donate', component: DonationPageComponent }, // Added this as it's used in project-view.component.html
  { path: 'undercon', component: HomePageComponent }, // Placeholder for under construction
];
