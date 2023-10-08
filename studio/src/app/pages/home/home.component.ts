import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'beever-home',
  standalone: true,
  template: `
    <div class="flex flex-col sm:flex-row items-center justify-center gap-8">
      <div class="flex flex-col items-center">
        <h1 class="font-caveat text-8xl text-white mb-4">
          BEEVER
        </h1>
        <p class="text-3xl text-white text-center">
          Your open source
          <span class="whitespace-nowrap">streaming studio</span>
        </p>
      </div>
      <img class="w-80 h-auto" src="assets/images/logo.png" alt=""/>
    </div>
    <div class="flex justify-center gap-4 py-8">
      <a mat-stroked-button color="accent" routerLink="/record" [queryParams]="{source: 'camera'}">Camera recorder</a>
      <a mat-stroked-button color="accent" routerLink="/record" [queryParams]="{source: 'audio'}">Mic recorder</a>
      <a mat-stroked-button color="accent" routerLink="/record" [queryParams]="{source: 'screen'}">Screen recorder</a>
    </div>
  `,
  imports: [
    RouterLink,
    MatButtonModule
  ]
})
export default class HomeComponent {

}
