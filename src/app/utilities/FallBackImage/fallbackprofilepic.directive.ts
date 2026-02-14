import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appFallbackprofilepic]',
  standalone: true
})
export class FallbackprofilepicDirective {
  fallbackimgsrc = "/assets/nulluserpic.svg"

  constructor() { }

  @HostListener('error', ['$event'])
  HandleImageError(event : Event) {
    const htmlelement : HTMLInputElement = event.target as HTMLInputElement
    htmlelement.src = this.fallbackimgsrc
  }
}
