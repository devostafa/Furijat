import {Component, OnInit} from '@angular/core';
import {Project} from "../../../data/models/Project";
import {ProjectsService} from "../../../services/Projects/projects.service";
import {CurrencyPipe, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ProjectsViewCategoryFilterPipe} from "../../../utilities/Pipes/projects-view-category-filter.pipe";
import {GenerateRange} from "../../../utilities/Helpers/GenerateArrayOfNumbers";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    NgSwitch,
    NgSwitchCase,
    ProjectsViewCategoryFilterPipe
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  animations: [
    trigger('fadeInOutAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('0.5s', style({opacity: 1}))
      ]),
      transition(':leave',[
        animate('0.5s', style({opacity: 0}))
      ])
    ])
  ]
})
export class ProjectsPageComponent implements OnInit{

  public paginatedProjects : Project[]
  public totalPagesNumber : number = 0
  selectedcategoryid : string = ""

  constructor(private projectsService : ProjectsService, private router : Router) {

  }

  ngOnInit() {
    this.GetProjects(1)
  }

  GetProjects(pageNumber : number) {
    this.projectsService.GetProjects(pageNumber).subscribe(res => {
      this.paginatedProjects = res.projects
      this.totalPagesNumber = res.totalPages
    })
  }

  ViewProject(projectid : string) {
    this.router.navigate(['/viewproject', projectid])
  }

  FilterProjects(categoryid : string) {
    this.selectedcategoryid = categoryid
  }

 GeneratePagesNumbers(n : number){
    return GenerateRange(n)
 }

  protected readonly environment = environment;
}
