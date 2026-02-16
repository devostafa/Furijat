import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Project} from "../../../../data/models/Project";
import {User} from "../../../../data/models/User";
import {AuthenticationService} from "../../../../services/Authentication/authentication.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FundRequestFormComponent} from "../../FundProjectForm/fund-request-form.component";
import {Donation} from "../../../../data/models/Donation";
import {environment} from "../../../../../environments/environment";
import {ProjectsService} from "../../../../services/Projects/projects.service";
import {FallbackprofilepicDirective} from "../../../../utilities/FallBackImage/fallbackprofilepic.directive";

import {CategoryEnum} from "../../../../data/enums/categoryEnum";
import {UserTypeEnum} from "../../../../data/enums/userTypeEnum";
import {ProjectBank} from "../../../../data/models/ProjectBank";

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    FundRequestFormComponent,
    FallbackprofilepicDirective
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent implements OnInit{
  userownsproject : boolean = false;

  public project : Project = {
    categoryId: CategoryEnum.General,
    status: false,
    email: "", imagesNames: [], userId: "", user: {} as User,
    currentFund: 0, description: "", id: "", title: "", totalFundRequired: 0, donations: [],
    bank: {} as ProjectBank,
    socialMedia: {facebook: "", instagram: "", x: ""},
    category: {id: CategoryEnum.General, name: ""},
    phoneNumber: ""
  }
  public user : User = {
    email: "",
    phoneNumber: "",
    profileImage: "",
    projects: [],
    userType: UserTypeEnum.General,
    description: "", id: "", userName: "", donations: [],
    fullName: "",
    socialMedia: {facebook: "", instagram: "", x: ""}
  }
  openprojectform : boolean = false
  userdonations : Donation[] = []
  tabNumber = 0;
  @ViewChild('InfoTabBtn') infoTabBtnElement : ElementRef
  @ViewChild('ProjectTabBtn') projectTabBtnElement : ElementRef

  constructor(private authService : AuthenticationService, private projectsService : ProjectsService) {

  }

  ngOnInit() {
    this.projectTabBtnElement.nativeElement.style.backgroundColor = "grey"
    this.GetUserData()
    this.GetUserProject()
  }

  userform = new FormGroup({
    username: new FormControl(''),
    description: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    phonenumber: new FormControl(''),
    email: new FormControl(''),
  });

  projectform = new FormGroup({
    projectname: new FormControl(''),
    description: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    phonenumber: new FormControl(''),
    email: new FormControl(''),
  });

  OpenFundForm() {
    this.openprojectform = true
  }

  RemoveProject() {
    this.projectsService.RemoveProject(this.project.id)
  }

  GetUserData() {
    this.authService.GetActiveUser().subscribe(userdatares => {
      this.user = userdatares
      this.userdonations = userdatares.donations
      if (this.user.projects && this.user.projects.length > 0) {
        this.userownsproject = true
        this.GetUserProject()
      }
    })
  }

  GetUserProject() {
    if (this.user.projects && this.user.projects.length > 0) {
      this.projectsService.GetProject(this.user.projects[0].id).subscribe(res => this.project = res)
    }
  }

  SetTab(selectTabNumber : number) {
    this.tabNumber = selectTabNumber
  }

  onFileSelected(e : any) {

  }

  protected readonly environment = environment;
}
