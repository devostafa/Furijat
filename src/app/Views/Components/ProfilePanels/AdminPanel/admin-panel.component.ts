import {Component, OnInit, signal} from '@angular/core';
import {FundRequestFormComponent} from "../../FundProjectForm/fund-request-form.component";
import {Project} from "../../../../Data/Models/Project";
import {Donation} from "../../../../Data/Models/Donation";
import {ProjectsService} from "../../../../Services/Projects/projects.service";
import {AdminService} from "../../../../Services/Admin/admin.service";
import Swal from "sweetalert2";
import {DonationsService} from "../../../../Services/Donations/donations.service";
import {NgForOf} from "@angular/common";
import {AuthenticationService} from "../../../../Services/Authentication/authentication.service";
import {Observable} from "rxjs";
import {User} from "../../../../Data/Models/User";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit{

  public currentAdmin = {} as User
  public projectrequestformvisible : boolean = true
  public projects : Project[] = []
  public donations : Donation[] = []
  public totalProjectsPages : number = 0
  public totalDonationsPages : number = 0
  public selectedProject = signal<Project>({} as Project)

  constructor(private projectsService : ProjectsService, private adminService : AdminService,private authService : AuthenticationService ,private donationsService : DonationsService) {

  }

  ngOnInit() {
    this.authService.GetActiveUser().subscribe(res => {
      this.currentAdmin = res
    })
    this.GetProjects(1)
    this.GetAllDonations()
  }

  ValidateProject(decision : boolean) {

  }

  GetProjects(pagenumber : number) {
    if (this.authService.currentIsLoggedIn && this.currentAdmin.usertype === "admin") {
      this.projectsService.GetProjects(pagenumber).subscribe(res => {
        this.projects = res.projects
        this.totalProjectsPages = res.totalPages
      })
    }
    else {
      Swal.fire("Please Login")
    }
  }

  SelectProjectToView(projectid : string) {
    const projectToSelect = this.projects.find(p => p.id == projectid)
    this.selectedProject.set(projectToSelect);
  }

  GetAllDonations() {
    if (this.authService.currentIsLoggedIn && this.currentAdmin.usertype === "admin") {
      this.donationsService.GetDonations().subscribe(res => this.donations = res)
    } else {
      Swal.fire("Please Login")
    }
  }

  async DeleteProject(projectid: string) {
    let res = await this.projectsService.RemoveProject(projectid)
    if (res) {

    }
    else {
      Swal.fire("Deleting Project failed")
    }
  }

  RejectDonation(donationId : string) {
    this.donationsService.DecideDonation(donationId,false).subscribe(res => {
      if (res) {
        return;
      }
      else {
        Swal.fire(`Rejecting Donation ${donationId} failed`)
      }
    })
  }

  AcceptDonation(donationId : string) {
    this.donationsService.DecideDonation(donationId,true).subscribe(res => {
      if (res) {
        return;
      }
      else {
        Swal.fire(`Accepting Donation ${donationId} failed`)
      }
    })
  }

  GenerateRange(n : number) {
    return Array.from({length : n}, (_, i) => i)
  }


  protected readonly environment = environment;
}
