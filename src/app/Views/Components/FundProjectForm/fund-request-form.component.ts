import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Project} from "../../../Data/Models/Project";
import {User} from "../../../Data/Models/User";
import {AuthenticationService} from "../../../Services/Authentication/authentication.service";
import {ProjectsService} from "../../../Services/Projects/projects.service";
import {Category} from "../../../Data/Models/Category";
import {ProjectRequest} from "../../../Data/Models/ProjectRequest";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

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

  async SubmitNewProject() {
    let check = this.CheckLogin()
    if (check) {
      //1-create project object and add in back
      let newproject : ProjectRequest = {
        id: "",
        title: this.newprojectform.controls.title.value,
        categoryid: this.newprojectform.controls.category.value,
        description: this.newprojectform.controls.description.value,
        totalFundRequired: this.newprojectform.controls.totalfundrequired.value,
        imagestoupload: this.imagestoupload,
        userId: this.userid,
        email: this.newprojectform.controls.email.value,
        facebook: this.newprojectform.controls.facebook.value,
        x: this.newprojectform.controls.x.value,
        instagram: this.newprojectform.controls.instagram.value,
        subtitle: this.newprojectform.controls.subtitle.value
      }
      let projectid = await this.projectsService.AddProjectRequest(newproject)
      if (projectid != null && undefined && "") {
        await this.router.navigate(['/viewproject', projectid])
      }
      else {
        Swal.fire("Adding Project Failed")
      }
    } else {

    }

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
