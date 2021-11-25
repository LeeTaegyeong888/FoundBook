import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  public dataChanged$: Subject<any> = new Subject<any>();

  constructor(public http: HttpClient) {}

  getBookSearch(searchBook: string, size: number) {
    console.log('searchBook :: ', searchBook, " size:: ", size);
    const api_url = 'https://dapi.kakao.com/v3/search/book?target=title';
    const options = {
      Authorization: 'KakaoAK 38c2f9a195653022ae9c8898fc68d69f',
    };
    const params = {
      query: searchBook,
      size: size
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

  storageAvailable(type: any): boolean {
    console.log('storageAvailable +++');

    let isStorage;
    try {
      isStorage = window[type];
      let testStorage = 'test_storage';
      localStorage.setItem(testStorage, testStorage);
      localStorage.removeItem(testStorage);
      console.log('check localstorage :: ', localStorage);
      return true;
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.code === 22 ||
          error.code === 1014 ||
          error.name === 'QuotaExceededError' ||
          error.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        isStorage &&
        isStorage.length !== 0
      ) {
        return false;
      }

      console.error('DisAvailable storage :: ', error);
    }

    return false;
  }

  saveSearchData(searchData: string) {}
}
