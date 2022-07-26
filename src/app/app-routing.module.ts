import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArtistComponent } from './AlphaComponents/add-artist/add-artist.component';
import { AddSongComponent } from './AlphaComponents/add-song/add-song.component';
import { AllArtistsComponent } from './AlphaComponents/all-artists/all-artists.component';
import { AllSongsComponent } from './AlphaComponents/all-songs/all-songs.component';
import { HomeComponent } from './AlphaComponents/home/home.component';
import { LoginComponent } from './AlphaComponents/login/login.component';
import { SignupComponent } from './AlphaComponents/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addsong', component: AddSongComponent },
  { path: 'addartist', component: AddArtistComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'allsongs', component: AllSongsComponent},
  { path: 'allartists', component: AllArtistsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
