import {Injectable} from '@angular/core';
import {Project} from "../../data/models/Project";
import {environment} from "../../../environments/environment";
import axios from "axios";
import {User} from "../../data/models/User";
import {HttpClient} from "@angular/common/http";
import {ProjectRequest} from "../../data/models/ProjectRequest";
import {PaginatedProjects} from "../../data/models/PaginatedProjects";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http : HttpClient) { }

  GetProjects(pagenumber : number) {
    return this.http.get<PaginatedProjects>(environment.backendurl + `/projects/getprojects/${pagenumber}`)
  }

  GetProject(projectid : string) {
    return this.http.get<Project>(environment.backendurl + `/projects/getproject/${projectid}`)
  }

  async GetProjectOwnerInfo(ownerid : string) {
    let response = await axios.get(environment.backendurl +  `/authentication/getuser/${ownerid}`)
    let user : User = response.data
    return user
  }

  async AddProjectRequest(projecttoadd : ProjectRequest) {
    //return the newly created project id
    return await axios.post<string>(environment.backendurl + '/projects/addproject', projecttoadd).then(res => res.data)
  }

  async RemoveProject(projectid : string) {
    let response = await axios.post(environment.backendurl + '/projects/removeproject', projectid)
    if (response.data == true) {
      return true
    }
    else {
      return false
    }
  }


}
