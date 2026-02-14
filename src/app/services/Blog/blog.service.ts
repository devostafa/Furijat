import {Injectable} from '@angular/core';
import {News} from "../../data/models/News";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http : HttpClient) { }

  async GetArticles() {
    return this.http.get<News[]>(environment.backendurl +  `/blog/articles`);
  }
}
