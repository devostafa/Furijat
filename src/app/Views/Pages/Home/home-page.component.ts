import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {News} from "../../../Data/Models/News";
import {NgForOf} from "@angular/common";
import {BlogService} from "../../../Services/blog/blog.service";
import {RouterLink} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {FallbackimageDirective} from "../../../Utilities/FallBackImage/fallbackimage.directive";

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
