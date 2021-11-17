import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { SearchPageComponent } from './component/search-page/search-page.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}
}
