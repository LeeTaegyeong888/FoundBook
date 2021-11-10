import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from './movie-service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[MovieService]
})
export class MovieModule { 

  constructor(private getter: MovieService) {}
  
  getSearchData(searchMovie: string) {
    return this.getter.getNaverSearch(searchMovie);
  }
}
