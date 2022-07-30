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
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SignupComponent } from './AlphaComponents/signup/signup.component';
import { Md5 } from 'ts-md5/dist/md5';
import { PopupComponent } from './AlphaComponents/popup/popup.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingComponent } from './AlphaComponents/rating/rating.component';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { NavBarComponent } from './AlphaComponents/nav-bar/nav-bar.component';
import { DataTableComponent } from './AlphaComponents/data-table/data-table.component';
import { AllSongsComponent } from './AlphaComponents/all-songs/all-songs.component';
import { AllArtistsComponent } from './AlphaComponents/all-artists/all-artists.component';
import { ContactUsComponent } from './AlphaComponents/contact-us/contact-us.component';
import { DetailsPageComponent } from './AlphaComponents/details-page/details-page.component';
import { AngMusicPlayerModule } from  'ang-music-player';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArtistCardComponent,
    SongCardComponent,
    AddSongComponent,
    AddArtistComponent,
    SignupComponent,
    PopupComponent,
    RatingComponent,
    NavBarComponent,
    DataTableComponent,
    AllSongsComponent,
    AllArtistsComponent,
    ContactUsComponent,
    DetailsPageComponent
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
    MatButtonModule,
    NgbModule,
    MatInputModule,
    MatFormFieldModule,
    DataTablesModule,
    AngMusicPlayerModule,
    NgxAudioPlayerModule,

  ],
  exports:[
    DataTablesModule
  ],
  providers: [
    ApiserviceService,
    Md5,
    {provide:MatDialogRef , useValue:{} },
    {provide:MAT_DIALOG_DATA, useValue: {} }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
