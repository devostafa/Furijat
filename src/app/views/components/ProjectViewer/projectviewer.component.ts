import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {NgForOf} from "@angular/common";
import {Project} from "../../../data/models/Project";
import {ProjectsService} from "../../../services/Projects/projects.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import Swal from "sweetalert2";
import {Category} from "../../../data/models/Category";
import {AuthenticationService} from "../../../services/Authentication/authentication.service";

import {CategoryEnum} from "../../../data/enums/categoryEnum";
import {ProjectBank} from "../../../data/models/ProjectBank";
import {User} from "../../../data/models/User";

@Component({
  selector: 'app-projectviewer',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './projectviewer.component.html',
  styleUrl: './projectviewer.component.scss'
})
export class ProjectViewerComponent implements OnChanges{

  editStatus = new BehaviorSubject(false)
  categories : Category[] = []
  @Input() userType : string = "user" || "admin"
  @Input() projectId : string = ""
  @Input() editProject : boolean = false
  project : Project = {
    categoryId: CategoryEnum.General,
    status: false,
    email: "", imagesNames: [], userId: "", user: {} as User,
    currentFund: 0, description: "", id: "", title: "", totalFundRequired: 0, donations: [],
    bank: {} as ProjectBank,
    socialMedia: {facebook: "", instagram: "", x: ""},
    category: {id: CategoryEnum.General, name: ""},
    phoneNumber: ""
  }
  imagesToUpload : File[] = []
  imageUrls : string[] = []

  constructor(private projectsService: ProjectsService, private authService : AuthenticationService) {
  }

  ngOnInit() {
    this.GetProject()
  }

  ngOnChanges(changes: SimpleChanges) {
    const projectIdValue = changes['projectId']
    if (projectIdValue.currentValue != projectIdValue.previousValue) {
      this.GetProject()
    }
  }

  projectForm = new FormGroup({
    title : new FormControl(''),
    description : new FormControl(''),
    categoryId : new FormControl(CategoryEnum.General),
    totalFundRequired : new FormControl(0),
    email : new FormControl(''),
    phoneNumber : new FormControl(''),
    x : new FormControl(''),
    facebook : new FormControl(''),
    instagram : new FormControl(''),
  })

  GetProject() {
    this.projectsService.GetProject(this.projectId).subscribe(res => {
      this.project = res
      this.projectForm.patchValue({
        title: res.title,
        description: res.description,
        categoryId: res.categoryId,
        totalFundRequired: res.totalFundRequired,
        email: res.email,
        phoneNumber: res.phoneNumber,
        x: res.socialMedia.x,
        facebook: res.socialMedia.facebook,
        instagram: res.socialMedia.instagram
      })
    })
  }

  UploadImage() {

  }

  EditProject() {
    this.editStatus.next(true)
  }

  UnlockEditForm() {

  }

  SaveProject() {

  }

  CheckLogin() {
    if (!this.authService.isLoggedIn.value) {
      Swal.fire("Please Login")
      return false
    }
    else {
      return true
    }
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const file: File = fileList[i];
        this.imagesToUpload.push(file)
        this.readImageFile(file)
      }
    }
  }

  readImageFile(file: File) {
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.imageUrls.push(e.target.result)
    }
  }

  protected readonly environment = environment;
}
