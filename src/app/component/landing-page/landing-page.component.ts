import { Component, OnInit } from '@angular/core';
import { MovieModule } from 'src/app/service/movie/movie-module';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private MovieModule : MovieModule) { }

  ngOnInit(): void {
    console.log(" movieService :: ", this.MovieModule.getSearchData("어벤져스"));
  }

}
