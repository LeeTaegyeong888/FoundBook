import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { ConstantPool } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(public http: HttpClient) {}

  getNaverSearch(searchMovie: string) {
    console.log("searchMovie :: ", searchMovie);
    const api_url = 'https://openapi.naver.com/v1/search/movie.json';
    const client_id = 'vrW0cCD4XI9uo0uZMvaI';
    const client_pw = 'HZa4TSSg05';
    const options = {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_pw,
    };
    const params = {
      query: searchMovie,
      display: 20,
    }

    this.http.get(api_url, {headers: options, params: params}).pipe(
        tap(() => {
          console.log('HTTP REQUEST');
        }),
        shareReplay() // 여러번 호출을 막는 코드
      ).subscribe({
        next: (result: any) => {
          console.log("result :: ", result);
        },
        error: (err: any) => {
          console.log("err :: ", err);
        }
      });

  }
}
