import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {News} from "../../../data/models/News";
import {NgForOf} from "@angular/common";
import {BlogService} from "../../../services/Blog/blog.service";
import {RouterLink} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {FallbackimageDirective} from "../../../utilities/FallBackImage/fallbackimage.directive";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    FallbackimageDirective
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  readonly environment = environment
  public allnews : News[] = []
  // @ts-ignore
  @ViewChildren('newsimage') imageElements: QueryList<ElementRef>;
  fallbackImageUrl: string = 'assets/nullimage.png'

  constructor(private backendService: BlogService) {
    this.GetNews()
  }

  ngOnInit(): void {
    this.GetNews()
  }

  async GetNews() {
    this.allnews = await this.backendService.GetArticles()
  }


}
