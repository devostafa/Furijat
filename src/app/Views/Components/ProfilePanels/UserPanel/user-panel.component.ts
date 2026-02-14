import {Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Project} from "../../../../Data/Models/Project";
import {User} from "../../../../Data/Models/User";
import {AuthenticationService} from "../../../../Services/Authentication/authentication.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FundRequestFormComponent} from "../../FundProjectForm/fund-request-form.component";
import {Donation} from "../../../../Data/Models/Donation";
import {environment} from "../../../../../environments/environment";
import {ProjectsService} from "../../../../Services/Projects/projects.service";
import {FallbackprofilepicDirective} from "../../../../Utilities/FallBackImage/fallbackprofilepic.directive";

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
    categoryId: "", facebook: "", instagram: "", x: "",
    status: false,
    email: "", imagesNames: [], userId: "", user: {} as User,
    category: {id: "", name: ""},
    currentFund: 0, description: "", id: "", subtitle: "", title: "", totalFundRequired: 0, donations: []}
  public user : User = {
    email: "",
    facebook: "",
    instagram: "",
    phoneNumber: "",
    profileImage: "",
    project: {} as Project,
    x_com: "",
    usertype: "", description: "", id: "", password: "", username: "", donations: []
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
    this.authService.GetActiveUser().subscribe(userdatares => this.user = userdatares)
  }

  GetUserProject() {
    this.projectsService.GetProject(this.user.project.id).subscribe(res => this.project = res)
  }

  SetTab(selectTabNumber : number) {
    this.tabNumber = selectTabNumber
  }

  onFileSelected(e : any) {

  }

  protected readonly environment = environment;
}
