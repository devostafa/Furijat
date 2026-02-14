import {Component, OnInit, signal} from '@angular/core';
import {Project} from "../../../data/models/Project";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectsService} from "../../../services/Projects/projects.service";
import {User} from "../../../data/models/User";
import {Donation} from "../../../data/models/Donation";
import {AuthenticationService} from "../../../services/Authentication/authentication.service";
import {DonationsService} from "../../../services/Donations/donations.service";
import Swal from "sweetalert2";


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
    categoryId: "", facebook: "", instagram: "", x: "",
    status: false,
    currentFund: 0,
     category: {id: "", name: ""},
    subtitle: "", donations: [],
    userId: "",
    totalFundRequired: 0,
    email: "", id: "", description: "", title: "",user : {} as User, imagesNames: []})
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
      //this.donationreceiptnumber = this.GenerateDonationNumber()
      this.GetSelectedProject(this.projectid)
    }
    this.authService.currentIsLoggedIn.subscribe(res => this.isLoggedIn = res)
    this.authService.GetActiveUser().subscribe(res => this.activeUser = res)
  }

  donationform = new FormGroup({
    paymenttype: new FormControl('', Validators.required),
    donationamount: new FormControl(0, Validators.required),
  })

  GetSelectedProject(projectid : string) {
    this.projectsService.GetProject(projectid).subscribe( (projectres : Project) => this.project.set(projectres))
  }

  SubmitDonation() {
    if (this.isLoggedIn && this.activeUser !== null && this.activeUser.usertype == "user") {
      let newDonation : Donation = {
        donationamount: this.donationform.controls.donationamount.value,
        id: "",
        paymenttype: this.donationform.controls.paymenttype.value,
        project: null,
        projectid: this.project().id,
        status: false,
        user: null,
        userid: this.activeUser.id
      }
      this.donationService.SubmitDonation(newDonation).subscribe(res => {})
    }
    else {
      Swal.fire("Please Login")
    }
  }

  /* NOT USED ANYMORE, AS GUID IS GENERATED ON SERVER-SIDE
  GenerateDonationNumber() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 50; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

   */

}
