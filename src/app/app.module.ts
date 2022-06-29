import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './AlphaComponents/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './AlphaComponents/login/login.component';
import { ArtistCardComponent } from './AlphaComponents/artist-card/artist-card.component';
import { SongCardComponent } from './AlphaComponents/song-card/song-card.component';
import {HttpClientModule} from '@angular/common/http'
import { ApiserviceService } from './AlphaServices/apiservice.service';
import { AddSongComponent } from './AlphaComponents/add-song/add-song.component';
import { AddArtistComponent } from './AlphaComponents/add-artist/add-artist.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArtistCardComponent,
    SongCardComponent,
    AddSongComponent,
    AddArtistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    ApiserviceService,
    {provide:MatDialogRef , useValue:{} },
    {provide:MAT_DIALOG_DATA, useValue: {} }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
