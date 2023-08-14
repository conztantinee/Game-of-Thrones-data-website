import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  searchTerm: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Initialize the component by retrieving the initial list of books
    this.getBooks();
  }

  // Retrieves the list of books from the data service
  getBooks() {
    this.dataService.getBooks(this.currentPage, this.pageSize).subscribe((response: any[]) => {
      this.books = response;
      this.totalPages = this.getTotalPages(response);
    });
  }
  
  // Calculates the total number of pages based on the book list
  private getTotalPages(books: any[]): number {
    if (books.length === 0) {
      return this.currentPage;
    }
    return this.currentPage + 1;
  }
  
  // Retrieves the next page of books
  getNextPage() {
    this.currentPage++;
    this.getBooks();
  }

  // Retrieves the previous page of books
  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getBooks();
    }
  }

  // Filters the books based on the search term
  filterBooks() {
    const params = { name: this.searchTerm };
    this.dataService.getBooks(1, 10, params)
      .subscribe(filteredBooks => {
        this.books = filteredBooks;
      });
  }
}
