import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Character } from '../character-detail/character';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character!: Character;
  fatherName!: string;
  motherName!: string;
  spouseNames!: { id: number; name: string; }[];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    // Retrieve the character ID from the route parameters
    const characterId = this.route.snapshot.paramMap.get('id');
    if (characterId) {
      // Retrieve the character details from the data service
      this.dataService.getCharacter(characterId).subscribe((character: Character) => {
        this.character = character;

        // Retrieve and set the father's name if available
        if (character.father && character.father !== "") {
          this.dataService.getCharacterName(character.father).subscribe((name: string) => {
            this.fatherName = name;
          });
        }

        // Retrieve and set the mother's name if available
        if (character.mother && character.mother !== "") {
          this.dataService.getCharacterName(character.mother).subscribe((name: string) => {
            this.motherName = name;
          });
        }

        // Retrieve and set the spouse names if available
        if (character.spouse.length > 0) {
          this.spouseNames = [];
          [...character.spouse].forEach((spouseUrl: string) => {
            const spouseId = this.extractIdFromUrl(spouseUrl);
            this.dataService.getCharacterName(spouseUrl).subscribe((name: string) => {
              this.spouseNames.push({ id: spouseId, name: name });
            });
          });
        }
      });
    }
  }

  // Extracts the ID from a URL
  public extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 1];
  }
}
