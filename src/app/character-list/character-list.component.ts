import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  searchName: string = '';
  searchCulture: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Initialize the component by retrieving characters
    this.getCharacters();
  }

  // Retrieves characters based on current page, page size, and search criteria
  getCharacters() {
    this.dataService.getCharacters(this.currentPage, this.pageSize, this.searchName, this.searchCulture)
      .subscribe((response: any[]) => {
        this.characters = response;
        this.totalPages = this.getTotalPages(response);
      });
  }

  // Calculates the total number of pages based on the characters array
  private getTotalPages(characters: any[]): number {
    if (characters.length === 0) {
      return this.currentPage;
    }
    return this.currentPage + 1;
  }

  // Moves to the next page and retrieves characters
  getNextPage() {
    this.currentPage++;
    this.getCharacters();
  }

  // Moves to the previous page and retrieves characters
  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCharacters();
    }
  }

  // Initiates a search for characters based on search criteria
  search() {
    this.currentPage = 1;
    this.getCharacters();
  }
}
