import {Injectable} from '@angular/core';
import {Project} from "../../data/models/Project";
import {environment} from "../../../environments/environment";
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

  GetProjectOwnerInfo(ownerid : string) {
    return this.http.get<User>(environment.backendurl +  `/authentication/getuser/${ownerid}`)
  }

  AddProjectRequest(projecttoadd : ProjectRequest) {
    // returns the newly created project id
    return this.http.post<string>(environment.backendurl + '/projects/addproject', projecttoadd)
  }

  RemoveProject(projectid : string) {
    return this.http.post<boolean>(environment.backendurl + '/projects/removeproject', projectid)
  }
}
