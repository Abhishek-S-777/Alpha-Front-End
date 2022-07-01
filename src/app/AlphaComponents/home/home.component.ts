import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  baseDir: string = '';
  songTableData: any = [];
  artistTableData: any = [];
  testURL: string = '';
  chromeServerURL = 'http://127.0.0.1:8887/';
  sanitizedUrl: any;
  cover_img: string = '';
  profile_pic: string = '';

  newArray:any = [];
  newArtistArray:any = [];




  constructor(private apiService: ApiserviceService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.apiService.getBaseDirectory().subscribe(res=>{
      this.baseDir = res.dir
      console.log(this.baseDir)
      this.apiService.innerJoinSongTable().subscribe(res=>{
        this.songTableData = res.data;
        console.log(this.songTableData);

        this.newArray = this.songTableData.reduce(
          (acc:any, song:any) => {
            const foundIndex = acc.findIndex(({ song_id }:any) => song_id === song.song_id)
            return foundIndex === -1
              // Song not found, simply add it
              ? [...acc, song]
              // Song is found, edit it with the artist
              : [
                // Copy existing list until the found song
                ...acc.slice(0, foundIndex),
                // edit found song with the new artist
                { ...acc[foundIndex], artist_name: `${acc[foundIndex].artist_name}, ${song.artist_name}` },
                // Copy the rest of the existing list after the found song
                ...acc.slice(foundIndex + 1, acc.length)
              ]
          },
          []
        )

        this.newArray.forEach((element:any) => {
          // if using running the  node js application locally.
          this.cover_img = element.cover_image;
          var sub_string = this.cover_img.substring(this.cover_img.lastIndexOf("/") + 1, this.cover_img.length)
          element.cover_image = this.chromeServerURL + sub_string;

          // // if running the node js application from a server.
          // this.cover_img = element.cover_image;
          // var sub_string = this.cover_img.substring(this.cover_img.lastIndexOf("/") + 1, this.cover_img.length)
          // element.cover_image = this.baseDir + sub_string;

        });
        console.log(this.newArray)
      })

      this.apiService.innerJoinArtistTable().subscribe(res=>{
        this.artistTableData = res.data;
        console.log(this.artistTableData);

        this.newArtistArray = this.artistTableData.reduce(
          (acc:any, song:any) => {
            const foundIndex = acc.findIndex(({ artist_id }:any) => artist_id === song.artist_id)
            return foundIndex === -1
              // Song not found, simply add it
              ? [...acc, song]
              // Song is found, edit it with the artist
              : [
                // Copy existing list until the found song
                ...acc.slice(0, foundIndex),
                // edit found song with the new artist
                { ...acc[foundIndex], song_name: `${acc[foundIndex].song_name}, ${song.song_name}` },
                // Copy the rest of the existing list after the found song
                ...acc.slice(foundIndex + 1, acc.length)
              ]
          },
          []
        )

        this.newArtistArray.forEach((element:any) => {
          // if using running the  node js application locally.
          this.profile_pic = element.profile_pic;
          var sub_string = this.profile_pic.substring(this.profile_pic.lastIndexOf("/") + 1, this.profile_pic.length)
          element.profile_pic = this.chromeServerURL + sub_string;

          // // if running the node js application from a server.
          // this.profile_pic = element.profile_pic;
          // var sub_string = this.profile_pic.substring(this.profile_pic.lastIndexOf("/") + 1, this.profile_pic.length)
          // element.profile_pic = this.baseDir + sub_string;

        });


        console.log(this.newArtistArray);
      })


    })

  }
}
