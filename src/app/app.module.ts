import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { HouseListComponent } from './house-list/house-list.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BookListComponent,
    CharacterListComponent,
    BookDetailComponent,
    CharacterDetailComponent,
    HouseListComponent,
    HouseDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
