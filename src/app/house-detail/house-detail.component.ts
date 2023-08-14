import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { House } from '../house-detail/house';
import { Character } from '../character-detail/character';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  house!: House;
  currentLordName!: string;
  heirName!: string;
  overlordName!: string;
  founderName!: string;
  swornMembers: Character[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const houseId = this.route.snapshot.paramMap.get('id');
    if (houseId) {
      // Retrieve house details based on the provided ID
      this.dataService.getHouse(houseId).subscribe((house: House) => {
        this.house = house;

        // Retrieve the name of the current lord of the house
        if (house.currentLord) {
          this.dataService.getCharacterName(house.currentLord).subscribe((name: string) => {
            this.currentLordName = name;
          });
        }

        // Retrieve the name of the heir of the house
        if (house.heir) {
          this.dataService.getCharacterName(house.heir).subscribe((name: string) => {
            this.heirName = name;
          });
        }

        // Retrieve the name of the overlord of the house
        if (house.overlord) {
          this.dataService.getHouseName(house.overlord).subscribe((name: string) => {
            this.overlordName = name;
          });
        }

        // Retrieve the name of the founder of the house
        if (house.founder) {
          this.dataService.getCharacterName(house.founder).subscribe((name: string) => {
            this.founderName = name;
          });
        }

        // Retrieve the sworn members of the house
        if (house.swornMembers.length > 0) {
          house.swornMembers.forEach((swornMemberUrl: string) => {
            this.dataService.getCharacter(swornMemberUrl).subscribe((character: Character) => {
              this.swornMembers.push(character);
            });
          });
        }
      });
    }
  }

  // Extracts the ID from a URL
  extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 1];
  }
}
