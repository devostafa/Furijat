import {Pipe, PipeTransform} from '@angular/core';
import {Project} from "../../data/models/Project";

@Pipe({
  name: 'projectsViewCategoryFilter',
  standalone: true
})
export class ProjectsViewCategoryFilterPipe implements PipeTransform {

  transform(items: Project[], selectedcategoryid: string ) {
    if (!items || !selectedcategoryid || selectedcategoryid == "" || '') {
      return items
    }
    else {
      return items.filter(item => item.category.id === selectedcategoryid)
    }
  }
}


