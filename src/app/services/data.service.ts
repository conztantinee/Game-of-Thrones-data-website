import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiBaseUrl = 'https://www.anapioficeandfire.com/api';
  private booksUrl = `${this.apiBaseUrl}/books`;
  private charactersUrl = `${this.apiBaseUrl}/characters`;
  private housesUrl = `${this.apiBaseUrl}/houses`;

  constructor(private http: HttpClient) {}

  // Retrieve a list of books based on the provided page, page size, and optional parameters
  getBooks(page: number, pageSize: number, params?: any) {
    let url = `${this.booksUrl}?page=${page}&pageSize=${pageSize}`;
    
    // Add additional parameters to the URL if provided
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          url += `&${key}=${params[key]}`;
        }
      }
    }
    
    return this.http.get<any[]>(url);
  }

  // Retrieve a specific book based on the provided book ID
  getBook(bookId: string) {
    const url = `${this.booksUrl}/${bookId}`;
    return this.http.get<any>(url);
  }

  // Retrieve a list of characters based on the provided page, page size, name search, and culture search
  getCharacters(page: number, pageSize: number, searchName: string, searchCulture: string) {
    let url = `${this.charactersUrl}?page=${page}&pageSize=${pageSize}`;
  
    // Add search parameters to the URL if provided
    if (searchName) {
      url += `&name=${searchName}`;
    }
  
    if (searchCulture) {
      url += `&culture=${searchCulture}`;
    }
  
    return this.http.get<any[]>(url);
  }

  // Retrieve a specific character based on the provided character ID
  getCharacter(characterId: string) {
    const url = `${this.charactersUrl}/${characterId}`;
    return this.http.get<any>(url);
  }

  // Retrieve a list of houses based on the provided page, page size, name search, and region search
  getHouses(page: number, pageSize: number, name: string, region: string) {
    let url = `${this.housesUrl}?page=${page}&pageSize=${pageSize}`;
    
    // Add filter parameters to the URL if provided
    if (name) {
      url += `&name=${name}`;
    }
    
    if (region) {
      url += `&region=${region}`;
    }
    
    return this.http.get<any[]>(url);
  }

  // Retrieve a specific house based on the provided house ID
  getHouse(houseId: string) {
    const url = `${this.housesUrl}/${houseId}`;
    return this.http.get<any>(url);
  }

  // Retrieve the name of a character based on the provided character URL
  getCharacterName(url: string) {
    return this.http.get<any>(url).pipe(
      map((character: any) => character.name)
    );
  }

  // Retrieve the name of a house based on the provided house URL
  getHouseName(url: string) {
    return this.http.get<any>(url).pipe(
      map((house: any) => house.name)
    );
  }

  // Retrieve the name of a book based on the provided book URL
  getBookName(url: string) {
    return this.http.get<any>(url).pipe(
      map((book: any) => book.name)
    );
  }
}
