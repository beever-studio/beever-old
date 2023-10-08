import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'beever-header',
  standalone: true,
  template: `
      <header class="flex justify-between">
          <a routerLink="/" class="font-caveat text-4xl text-white text-shadow shadow-primary">
              BEEVER
          </a>
      </header>
  `,
  imports: [
    RouterLink
  ]
})
export class HeaderComponent {

}
