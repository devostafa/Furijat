import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../data/models/Project";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../data/models/User";
import {ProjectsService} from "../../../services/Projects/projects.service";
import {CurrencyPipe, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {FallbackimageDirective} from "../../../utilities/FallBackImage/fallbackimage.directive";
import {AuthenticationService} from "../../../services/Authentication/authentication.service";
import Swal from "sweetalert2";
import {FallbackprofilepicDirective} from "../../../utilities/FallBackImage/fallbackprofilepic.directive";
import {CategoryEnum} from "../../../data/enums/categoryEnum";
import {ProjectBank} from "../../../data/models/ProjectBank";

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [
    NgForOf,
    FallbackimageDirective,
    NgSwitchCase,
    NgSwitch,
    FallbackprofilepicDirective,
    CurrencyPipe
  ],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent implements OnInit{
  public projectid: string | null = ""
  public project : Project = {
    categoryId: CategoryEnum.General,
    status: false,
    donations: [],
    email: "",
    imagesNames: [],
    userId: "",
    category: {id: CategoryEnum.General, name: ""},
    currentFund: 0,
    description: "",
    id: "",
    user: {} as User,
    title: "",
    totalFundRequired: 0,
    bank: {} as ProjectBank,
    socialMedia: {facebook: "", instagram: "", x: ""},
    phoneNumber: ""
  }
  isUserLoggedIn : boolean = false
  isSuccessfulDonation : boolean = false
  @ViewChild("imagePreview") imagePreview : ElementRef
  //THERE'S A BUG RELATED TO INTERPOLATING THIS VARIABLE BEFORE GETTING PROJECT DATA
  imageToView : string = ""

  constructor(private router : Router,private route: ActivatedRoute, private projectsService: ProjectsService, private authService : AuthenticationService) {

  }

  ngOnInit() {
    const segments = this.route.snapshot.url.map(segment => segment.path);
    this.isSuccessfulDonation = segments.includes("successfuldonation")
    this.route.paramMap.subscribe(params => {
      this.projectid = params.get('id')
    })
    this.authService.currentIsLoggedIn.subscribe(res => this.isUserLoggedIn = res)
    if (this.projectid !== null) {
      this.GetProject(this.projectid)
    }
    if (this.isSuccessfulDonation) {
      Swal.fire({
        title: "Donation Successful",
        text: "Thank You For Your Donation\n" +
          "an e-mail will be sent when your donation is accepted by admins"
      })
    }
  }

  ChangeSelectedImage(imageName : string) {
    this.imageToView = imageName
  }


  GetProject(projectid : string) {
    this.projectsService.GetProject(projectid).subscribe( (projectres : Project) => {
      this.project = projectres
      this.imageToView = projectres.imagesNames[0]
    })
  }

  GoDonate() {
    if (this.projectid !== null && this.isUserLoggedIn) {
      this.router.navigate(['/donation', this.projectid])
    }
    else {
      Swal.fire("Please Login")
    }
  }


  protected readonly environment = environment;
}
