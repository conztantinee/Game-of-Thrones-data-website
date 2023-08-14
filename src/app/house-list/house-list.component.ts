import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  houses: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  searchName: string = '';
  searchRegion: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getHouses();
  }

  // Retrieve a list of houses based on the current page, page size, name search, and region search
  getHouses() {
    this.dataService.getHouses(this.currentPage, this.pageSize, this.searchName, this.searchRegion)
      .subscribe((response: any[]) => {
        this.houses = response;
        this.totalPages = this.getTotalPages(response);
      });
  }

  // Calculate the total number of pages based on the houses retrieved
  private getTotalPages(houses: any[]): number {
    if (houses.length === 0) {
      return this.currentPage;
    }
    const totalHouses = houses.length > 0 ? houses[0].total : 0;
    return Math.ceil(totalHouses / this.pageSize);
  }

  // Go to the next page of houses
  getNextPage() {
    this.currentPage++;
    this.getHouses();
  }

  // Go to the previous page of houses
  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getHouses();
    }
  }

  // Perform a search for houses based on the provided search criteria
  search() {
    this.currentPage = 1;
    this.getHouses();
  }
}
