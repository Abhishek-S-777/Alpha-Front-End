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
    {header: "Name", field: "artist_name"},
    {header: "DOB", field: "dob"},
    {header: "Songs", field: "song_name"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
