import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from "./core/components/header.component";

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  selector: 'beever-root',
  template: `
      <beever-header></beever-header>
      <main class="flex flex-col items-center justify-center pt-16">
          <router-outlet></router-outlet>
      </main>
  `,
})
export class AppComponent {
}
