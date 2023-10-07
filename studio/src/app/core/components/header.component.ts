import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'beever-header',
  standalone: true,
  template: `
      <header class="flex justify-between">
      <span class="font-caveat text-4xl text-white text-shadow shadow-primary">
        BEEVER
      </span>
          <nav>
              <ul class="text-white flex gap-2">
                  <li>
                      <a routerLink="/">Home</a>
                  </li>
                  <li>
                      <a routerLink="/record">Record</a>
                  </li>
              </ul>
          </nav>
      </header>
  `,
  imports: [
    RouterLink
  ]
})
export class HeaderComponent {

}
