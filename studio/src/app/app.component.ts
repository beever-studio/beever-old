import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HeaderComponent} from "./core/components/header.component";

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  selector: 'beever-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
}
