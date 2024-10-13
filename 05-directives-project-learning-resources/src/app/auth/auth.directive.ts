// Creating custom structural directive
// We want to use it on elements which are rendered contionally

import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });

  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef); // reference to markup between ng-template
  private viewContainerRef = inject(ViewContainerRef); // reference to the place in DOM, where this template is used

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        // to render new content(enclosed b/w ng-content) in certain place in DOM
      } else {
        this.viewContainerRef.clear();
        // this clears any embedded view that has been rendered
      }
    });
  }
}
