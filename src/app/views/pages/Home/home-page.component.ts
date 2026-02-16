import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BlogArticle} from "../../../data/models/BlogArticle";
import {NgForOf, NgIf} from "@angular/common";
import {BlogService} from "../../../services/Blog/blog.service";
import {RouterLink} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {FallbackimageDirective} from "../../../utilities/FallBackImage/fallbackimage.directive";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FallbackimageDirective
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  readonly webEnvironment = environment

  public articles: BlogArticle[] = []
  public isLoading: boolean = true;

  // @ts-ignore
  @ViewChildren('newsimage') imageElements: QueryList<ElementRef>;
  fallbackImageUrl: string = 'assets/nullimage.png'

  constructor(private backendService: BlogService) {}

  ngOnInit(): void {
    this.GetBlog()
  }

  GetBlog() {
    this.isLoading = true;
    this.backendService.GetArticles().subscribe({
      next: (res) => {
        this.articles = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.articles = [];
        this.isLoading = false;
      }
    });
  }
}
