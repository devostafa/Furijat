import {Component, Input, SimpleChanges} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectsService} from "../../../../../Services/Projects/projects.service";
import {Project} from "../../../../../Data/Models/Project";
import {BehaviorSubject} from "rxjs";
import {Category} from "../../../../../Data/Models/Category";
import {AuthenticationService} from "../../../../../Services/Authentication/authentication.service";
import {environment} from "../../../../../../environments/environment";
import {UserTypeEnum} from "../../../../../Data/enums/userTypeEnum";

@Component({
  selector: 'app-adminprofileview-page',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './adminprofileview-page.component.html',
  styleUrl: './adminprofileview-page.component.scss'
})
export class AdminprofileviewPageComponent {

  editStatus = new BehaviorSubject(false)
  categories : Category[] = []
  userType : UserTypeEnum
  projectId : string = ""
  editProject : boolean = false
  project : Project = {} as Project
  imagesToUpload : File[] = []
  imageUrls : string[] = []


  constructor(private router : Router,private route: ActivatedRoute, private projectsService: ProjectsService, private authService : AuthenticationService) {
  }

  ngOnInit() {
    this.GetProject()
  }

  GetProject() {
    this.projectsService.GetProject(this.projectId).subscribe(res => this.project = res)
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
    if (!this.authService.isLoggedIn) {
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
