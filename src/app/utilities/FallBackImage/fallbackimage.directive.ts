import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appFallbackimage]',
  standalone: true
})
export class FallbackimageDirective {

  fallbackimgsrc = "/assets/nullimage.png"

  constructor() { }

  @HostListener('error', ['$event'])
  HandleImageError(event : Event) {
    const htmlelement : HTMLInputElement = event.target as HTMLInputElement
    htmlelement.src = this.fallbackimgsrc
  }
}
