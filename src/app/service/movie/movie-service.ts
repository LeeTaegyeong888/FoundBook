import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public dataChanged$: Subject<any> = new Subject<any>();

  private loadingSearchData: Observable<any> | undefined;
  private seachMovieName?: string;
  constructor(public http: HttpClient) {}

  getNaverSearch(searchMovie: string): Observable<any> {
    console.log("getNaverSearch :: ", searchMovie);
    const api_url = 'https://openapi.naver.com/v1/search/movie.json';
    const client_id = 'vrW0cCD4XI9uo0uZMvaI';
    const client_pw = 'HZa4TSSg05';
    const options = {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_pw,
    };
    const params = {
      query: searchMovie,
      display: 10,
    };
    this.loadingSearchData = this.http.get(api_url, {headers: options, params: params}).pipe(tap(),shareReplay()); // 여러번 호출을 막는 코드
    this.loadingSearchData.subscribe({
        next: (result: any) => {
          this.dataChanged$.next(result);
        },
        error: (err: any) => {
          console.log("err :: ", err);
          this.dataChanged$.next(err);
        }
      });


      return this.loadingSearchData;
  }
}
