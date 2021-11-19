import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/service/book/book-service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  
  private searchSub: Subscription;
  
  public searchBook: string = "";
  @ViewChild('inputField', { read: ElementRef, static: false }) inputFieldEle!: ElementRef;

  constructor(
    private BookService: BookService,
    private router: Router,) {
    this.searchSub = this.BookService.dataChanged$.subscribe(
      this.onDataChanged.bind(this)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.searchSub) this.searchSub.unsubscribe();
  }
  onDataChanged(searchData: any): void {
    if (!searchData) return;
    console.log(' search Data :: ', searchData);
  }

  searchBookDatas(event: any) {
    console.log(" event :: ", event);
    event.preventDefault();
    this.searchBook = this.inputFieldEle.nativeElement.innerText;
    this.BookService.getBookSearch(this.searchBook);
    this.router.navigate(['./search']);
    this.inputFieldEle.nativeElement.innerText = this.searchBook;
  }

  deleteSearchValue() {
    this.inputFieldEle.nativeElement.innerText = "";
  }
}
