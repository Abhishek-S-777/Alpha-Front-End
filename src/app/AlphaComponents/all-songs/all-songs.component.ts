import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.scss']
})
export class AllSongsComponent implements OnInit {

  constructor(private apiService: ApiserviceService,) { }


  type: string = "songs";

  colData:any = [
    {header: "ID", field: "song_id"},
    {header: "Cover", field: "cover_image"},
    {header: "Title", field: "song_name"},
    {header: "Release", field: "release_date"},
    {header: "Artists", field: "artist_name"},
    {header: "Rating", field: "song_rating"},
    // {header: "Audio", field: "audio"},
  ]

  ngOnInit(): void {

  }


}
