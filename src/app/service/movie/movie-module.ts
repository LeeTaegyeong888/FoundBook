import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from './movie-service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
