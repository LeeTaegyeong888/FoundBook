import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public dataChanged$: Subject<any> = new Subject<any>();

  constructor(public http: HttpClient) {}

  getBookSearch(searchBook: string) {
    console.log('searchBook :: ', searchBook);
    const api_url = 'https://dapi.kakao.com/v3/search/book?target=title';
    const options = {
      'Authorization' : 'KakaoAK 38c2f9a195653022ae9c8898fc68d69f'
    };
    const params = {
      query: searchBook,
    };
    this.http.get(api_url, { headers: options, params: params }).subscribe({
      next: (result: any) => {
        this.dataChanged$.next(result);
      },
      error: (err: any) => {
        console.log('err :: ', err);
        this.dataChanged$.next(err);
      },
    });
  }
}
