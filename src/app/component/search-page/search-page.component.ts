import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/service/book/book-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  bookDataContent,
  bookServerData,
} from 'src/app/service/book/book-interface';
import { filter } from 'rxjs/operators';

interface bookPropertyData {
  title: string;
  authors: string;
  translators: string;
  publisher: string;
  datetime: string;
  contents: string;
  url: string;
  thumbnail: string;
  sale_price: number;
  price: number;
}
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  private searchSub: Subscription;
  private searchbookTitle: string;
  private defaultSize: number = 10;
  private isEnd: boolean = false;

  public bookData: bookPropertyData[] = [];
  public isLoad: boolean = false;

  @ViewChild('menuField', { read: ElementRef, static: false })
  menuFieldEle!: ElementRef;
  constructor(
    private BookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.searchbookTitle = this.activatedRoute.snapshot.queryParamMap.get('searchBookTitle') as string;
    this.searchSub = this.BookService.dataChanged$.subscribe(
      this.onDataChanged.bind(this)
    );
  }
  
  ngOnInit(): void {
    if (this.bookData.length === 0) {
      this.BookService.getBookSearch(this.searchbookTitle, this.defaultSize);
    }
  }

  ngOnDestroy(): void {
    if (this.searchSub) this.searchSub.unsubscribe();
    this.isLoad = false;
  }

  onDataChanged(searchData: bookServerData): void {
    if (!searchData || this.isLoad) return;
    console.log('SearchPageComponent  search Data :: ', searchData);
    //this.bookData = searchData.documents;
    this.isEnd = searchData.meta.is_end;
    this.parseBookData(searchData.documents);
  }

  onBackPress() {
    console.log('onBackPress');
    this.router.navigate(['./landing']);
  }

  onMenuClick() {
    console.log('onMenuClick');
    if (this.menuFieldEle.nativeElement.classList.contains('menuFieldFocus')) {
      this.menuFieldEle.nativeElement.classList.remove('menuFieldFocus');
    } else {
      this.menuFieldEle.nativeElement.classList.add('menuFieldFocus');
    }
  }

  onMoreSearch() {
    if (!this.isEnd) {
      this.isLoad = false;
      this.defaultSize += 10;
      console.log('onMoreSearch :: ', this.defaultSize);
      this.BookService.getBookSearch(this.searchbookTitle, this.defaultSize);
    } else {
      window.alert('검색 결과를 다 찾았어요!');
    }
  }

  goToBookLink(url: string) {
    console.log('goToBookLink');
    window.open(url, '_blank');
  }

  private parseBookData(bookDatas: bookDataContent[]) {
    this.bookData = bookDatas
      .filter((books: bookDataContent) => {
        return books.status !== '';
      })
      .map((book: bookDataContent) => {
        return {
          title: book.title,
          authors: book.authors.join(', '),
          translators: book.translators.join(', '),
          publisher: book.publisher,
          datetime: book.datetime.split('T')[0],
          contents: book.contents,
          url: book.url,
          thumbnail: book.thumbnail,
          sale_price: book.sale_price,
          price: book.price,
        };
      });

    this.isLoad = true;

    console.log('parseBookData  this.bookData :: ', this.bookData);
  }
}
