import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/Authentication/authentication.service";
import {ProjectsService} from "../../../services/Projects/projects.service";
import {Category} from "../../../data/models/Category";
import {ProjectRequest} from "../../../data/models/ProjectRequest";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

import {CategoryEnum} from "../../../data/enums/categoryEnum";

@Component({
  selector: 'app-fund-request-form',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './fund-request-form.component.html',
  styleUrl: './fund-request-form.component.scss'
})
export class FundRequestFormComponent {

  imagestoupload : File[] = []
  imagesurls : string[] = []
  categories: Category[] = []
  @Input() userid : string = ""

  constructor(private authService: AuthenticationService, private projectsService: ProjectsService, private router : Router) {
  }

  newprojectform = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    subtitle: new FormControl('',Validators.required),
    totalfundrequired: new FormControl(0, Validators.required),
    category: new FormControl( null, Validators.required),
    instagram: new FormControl(''),
    facebook: new FormControl(''),
    x: new FormControl(''),
    email: new FormControl(''),
  });

  SubmitNewProject() {
    let check = this.CheckLogin()
    if (check) {
      //1-create project object and add in back
      let newproject : ProjectRequest = {
        id: "",
        title: this.newprojectform.controls.title.value ?? "",
        categoryId: this.newprojectform.controls.category.value ?? CategoryEnum.General,
        description: this.newprojectform.controls.description.value ?? "",
        fundRequired: this.newprojectform.controls.totalfundrequired.value ?? 0,
        imagesToUpload: this.imagestoupload,
        userId: this.userid,
        email: this.newprojectform.controls.email.value ?? "",
        socialMedia: {
          facebook: this.newprojectform.controls.facebook.value ?? "",
          x: this.newprojectform.controls.x.value ?? "",
          instagram: this.newprojectform.controls.instagram.value ?? ""
        }
      }
      this.projectsService.AddProjectRequest(newproject).subscribe(projectid => {
        if (projectid) {
          this.router.navigate(['/project', projectid])
        }
        else {
          Swal.fire("Adding Project Failed")
        }
      })
    } else {

    }

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
        this.imagestoupload.push(file)
        this.readImageFile(file)
      }
    }
  }

  readImageFile(file: File) {
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.imagesurls.push(e.target.result)
    }
  }



}
