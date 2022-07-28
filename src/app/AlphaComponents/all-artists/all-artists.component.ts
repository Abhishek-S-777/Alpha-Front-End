import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.scss']
})
export class AllArtistsComponent implements OnInit {

  type: string = "artists";

  colData:any = [
    {header: "ID", field: "artist_id"},
    {header: "Profile", field: "profile_pic"},
    {header: "Name", field: "artist_name"},
    {header: "DOB", field: "dob"},
    {header: "Songs", field: "song_name"},
    {header: "Rating", field: "artist_rating"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
