import {Component} from "@angular/core";

@Component({
  selector: 'beever-home',
  standalone: true,
  template: `
      <div class="flex flex-col sm:flex-row items-center justify-center gap-8">
          <img class="w-80 h-auto" src="assets/images/beaver.jpg" alt=""/>
          <div class="flex flex-col items-center">
              <h1 class="font-caveat text-8xl text-white text-shadow shadow-primary">
                  BEEVER
              </h1>
              <p class="font-caveat text-3xl text-white text-center">
                  Your open source
                  <span class="whitespace-nowrap">streaming studio</span>
              </p>
          </div>
      </div>
  `,
})
export default class HomeComponent {

}
