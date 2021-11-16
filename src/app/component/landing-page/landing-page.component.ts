import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movie/movie-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  private searchSub: Subscription;
  
  constructor(private moviesService : MovieService) { 
    this.moviesService.getNaverSearch("어벤져스");
    this.searchSub = this.moviesService.dataChanged$.subscribe(this.onDataChanged.bind(this));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.searchSub) this.searchSub.unsubscribe();
  }

  onDataChanged(searchData: any): void {
    if (!searchData) return;
    console.log(" search Data :: ", searchData);
  }

}
