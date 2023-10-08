import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'beever-home',
  standalone: true,
  template: `
    <div class="flex flex-col sm:flex-row items-center justify-center gap-8">
      <img class="w-80 h-auto" src="assets/images/beaver.jpg" alt=""/>
      <div class="flex flex-col items-center">
        <h1 class="font-caveat text-8xl text-white">
          BEEVER
        </h1>
        <p class="font-caveat text-3xl text-white text-center">
          Your open source
          <span class="whitespace-nowrap">streaming studio</span>
        </p>
      </div>
    </div>
    <div class="flex justify-center gap-4 py-8">
      <a mat-stroked-button color="accent" routerLink="/record" [queryParams]="{source: 'camera'}">Camera recorder</a>
      <a mat-stroked-button color="accent" routerLink="/record" [queryParams]="{source: 'audio'}">Mic recorder</a>
    </div>
  `,
  imports: [
    RouterLink,
    MatButtonModule
  ]
})
export default class HomeComponent {

}
