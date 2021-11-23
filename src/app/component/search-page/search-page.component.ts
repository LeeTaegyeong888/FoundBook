import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/service/book/book-service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  bookDataContent,
  bookServerData,
  metaServerData,
} from 'src/app/service/book/book-interface';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  private searchSub: Subscription;

  public bookData: bookDataContent[] = [];
  public isMoreBookData: boolean = false;
  @ViewChild('menuField', { read: ElementRef, static: false })
  menuFieldEle!: ElementRef;
  constructor(private BookService: BookService, private router: Router) {
    this.searchSub = this.BookService.dataChanged$.subscribe(
      this.onDataChanged.bind(this)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.searchSub) this.searchSub.unsubscribe();
  }

  onDataChanged(searchData: bookServerData): void {
    if (!searchData) return;
    console.log('SearchPageComponent  search Data :: ', searchData);
    this.bookData = searchData.documents;
    this.isMoreBookData = !searchData.meta.is_end;
  }

  onBackPress() {
    console.log('onBackPress');
    this.router.navigate(['./landing']);
  }

  onMenuClick() {
    console.log('onMenuClick');
    this.menuFieldEle.nativeElement.classList.add('menuFieldFocus');
  }
}
