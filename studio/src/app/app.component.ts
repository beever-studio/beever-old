import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from "./core/components/header.component";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

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
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('volume_off', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/volume_off.svg'));
    iconRegistry.addSvgIcon('volume', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/volume.svg'));
    iconRegistry.addSvgIcon('videocam', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/videocam.svg'));
    iconRegistry.addSvgIcon('videocam_off', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/videocam_off.svg'));
    iconRegistry.addSvgIcon('capture', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/capture.svg'));
  }
}
