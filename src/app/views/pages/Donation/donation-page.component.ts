import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Project} from "../../../data/models/Project";
import {User} from "../../../data/models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectsService} from "../../../services/Projects/projects.service";
import {DonationsService} from "../../../services/Donations/donations.service";
import {AuthenticationService} from "../../../services/Authentication/authentication.service";
import {UserTypeEnum} from "../../../data/enums/userTypeEnum";
import {Donation} from "../../../data/models/Donation";
import Swal from "sweetalert2";
import {CategoryEnum} from "../../../data/enums/categoryEnum";
import {ProjectBank} from "../../../data/models/ProjectBank";

@Component({
  selector: 'app-donation-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './donation-page.component.html',
  styleUrl: './donation-page.component.scss'
})
export class DonationPageComponent implements OnInit{
  projectid : string | null = ""
  project = signal<Project>({
    categoryId: CategoryEnum.General,
    status: false,
    currentFund: 0,
    category: {id: CategoryEnum.General, name: ""},
    donations: [],
    userId: "",
    totalFundRequired: 0,
    email: "", id: "", description: "", title: "", user : {} as User, imagesNames: [],
    bank: {} as ProjectBank,
    socialMedia: {facebook: "", instagram: "", x: ""},
    phoneNumber: ""
  })
  donationreceiptnumber : string = ''
  donationamountview : number = 0
  isLoggedIn : boolean = false
  activeUser : User = {} as User

  constructor(private router : Router,private route: ActivatedRoute, private projectsService: ProjectsService, private donationService : DonationsService ,private authService : AuthenticationService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectid = params.get('id')
    })
    if (this.projectid !== null) {
      this.GetSelectedProject(this.projectid)
    }
    this.authService.currentIsLoggedIn.subscribe(res => this.isLoggedIn = res)
    this.authService.GetActiveUser().subscribe(res => this.activeUser = res)

    this.donationform.controls.donationamount.valueChanges.subscribe(res => {
      this.donationamountview = res ?? 0
    })
  }

  donationform = new FormGroup({
    paymenttype: new FormControl('', Validators.required),
    donationamount: new FormControl(0, [Validators.required, Validators.min(1)]),
  })

  GetSelectedProject(projectid : string) {
    this.projectsService.GetProject(projectid).subscribe( (projectres : Project) => this.project.set(projectres))
  }

  SubmitDonation() {
    if (this.isLoggedIn && this.activeUser !== null && (this.activeUser.userType == UserTypeEnum.User || this.activeUser.userType == UserTypeEnum.General)) {
      let newDonation : Donation = {
        donationAmount: this.donationform.controls.donationamount.value ?? 0,
        id: "",
        paymentType: this.donationform.controls.paymenttype.value ?? "",
        project: this.project(),
        projectId: this.project().id,
        status: false,
        user: this.activeUser,
        userId: this.activeUser.id
      }
      this.donationService.SubmitDonation(newDonation).subscribe(res => {
        this.router.navigate(['/donation', this.project().id, 'success'])
      })
    }
    else {
      Swal.fire("Please Login")
    }
  }
}
