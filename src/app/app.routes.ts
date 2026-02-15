import {Routes} from '@angular/router';
import {HomePageComponent} from "./views/pages/Home/home-page.component";
import {ProfilePageComponent} from "./views/pages/Profile/profile-page.component";
import {ProjectsPageComponent} from "./views/pages/Projects/projects-page.component";
import {ProjectViewComponent} from "./views/pages/ProjectView/project-view.component";
import {LoginRegisterPageComponent} from "./views/pages/LoginRegister/login-register-page.component";
import {DonationPageComponent} from "./views/pages/Donation/donation-page.component";
import {
  AdminprofileviewPageComponent
} from "./views/components/ProfilePanels/AdminPanel/AdminProjectView/adminprofileview-page.component";
import {ErrorPage} from "./views/pages/error-page/error-page";

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'auth-landing', component: LoginRegisterPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'project/:id', component: ProjectViewComponent },
  { path: 'admin/view/:id', component: AdminprofileviewPageComponent },
  // { path: 'donation/:id', component: DonationPageComponent, canActivate: [profileguardGuard]  },
  // { path: 'donation/:id/success', component: ProjectViewComponent },
  { path: 'blog/:id', component: ProjectViewComponent },
  { path: 'donate', component: DonationPageComponent },
  { path: '**', component: ErrorPage }

];
