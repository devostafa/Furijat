import {Injectable} from '@angular/core';
import {BlogArticle} from "../../data/models/BlogArticle";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http : HttpClient) { }

  GetArticles() {
    return this.http.get<BlogArticle[]>(environment.backendurl +  `/blog/articles`);
  }
}
