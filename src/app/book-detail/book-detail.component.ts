import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // Retrieve the bookId parameter from the route
    const bookId = this.route.snapshot.paramMap.get('id');
    
    // Check if bookId is present
    if (bookId) {
      // Call the data service to get the book details based on the bookId
      this.dataService.getBook(bookId).subscribe((book) => {
        this.book = book;
      });
    }
  }

  // Extracts the ID from the given URL
  extractIdFromUrl(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 1];
  }

  // Gets the name of a character based on the character's URL
  getCharacterName(characterUrl: string): Observable<string> {
    const characterId = this.extractIdFromUrl(characterUrl);
    return this.dataService.getCharacter(characterId).pipe(map((character) => character ? character.name : ''));
  }

  // Gets the name of a house based on the house's URL
  getHouseName(houseUrl: string): Observable<string> {
    const houseId = this.extractIdFromUrl(houseUrl);
    return this.dataService.getHouse(houseId).pipe(map((house) => house ? house.name : ''));
  }
}
