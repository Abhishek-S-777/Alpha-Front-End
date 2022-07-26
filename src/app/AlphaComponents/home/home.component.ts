import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  addRatingGroup = new FormGroup({
    "uid": new FormControl(''),
    "songid": new FormControl(''),
    "artistid": new FormControl(''),
    "rating": new FormControl(''),

  });


  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    destroy: true
  };
  dtOptions1: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 5,
    destroy: true
  };



  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();


  // // If we want to use multiple data tables in a single component..
  // @ViewChildren(DataTableDirective) dtElements!: QueryList<DataTableDirective>;


  // // If we want to use single data tables in a single component..
  // @ViewChild(DataTableDirective, {static: false}) dtElement !: DataTableDirective;
  // @ViewChild(DataTableDirective, {static: false}) dtElement1 !: DataTableDirective;

  baseDir: string = '';
  songTableData: any = [];
  artistTableData: any = [];
  testURL: string = '';
  chromeServerURL = 'http://127.0.0.1:8887/';
  sanitizedUrl: any;
  cover_img: string = '';
  profile_pic: string = '';

  newArray:any = [];
  top10Songs:any = [];

  newArtistArray:any = [];
  top10Artists:any = [];

  rating:any;
  currentRate = 0;

  max = 5;
  rate = 3;
  isReadonly = false;

  ratingComponent: number = 3;
  starCount: number = 5;

  userID : any;
  userSongRatingsData : any = [];
  userArtistRatingsData : any = [];
  formData = new FormData();

  constructor(
    private apiService: ApiserviceService,
    ) { }


  ngOnInit(): void {
    this.userID = JSON.parse(localStorage.getItem("userID")!);
    console.log(this.userID);
    console.log(typeof(this.userID));
    let queryParams = new HttpParams();
    queryParams = queryParams.append("uid",this.userID);

    this.apiService.getBaseDirectory().subscribe(res=>{
      this.apiService.userRatingDetails(queryParams).subscribe(res=>{
        this.userSongRatingsData = res.data;
        console.log("User songs rating data", this.userSongRatingsData);
      })

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

        this.newArray.map((item:any) => {
          let songID = item.song_id;
          this.userSongRatingsData.map((item2:any) => {
            let songID2 = item2.song_id;
            if (songID === songID2) {
              item['song_rating'] = item2.song_rating;
              // console.log(item);
            }
          });

        },
        // this.ch.detectChanges(),
        // this.dtTrigger.next(),
        );
        console.log(this.newArray)

        this.top10Songs = this.newArray.sort((a:any, b:any) => b.average_rating-a.average_rating).slice(0,10);
        console.log("Top 10 songs", this.top10Songs)

      })



      // console.log("Top 10 songs", this.top10Songs)


      this.apiService.userArtistRatingDetails(queryParams).subscribe(res=>{
        this.userArtistRatingsData = res.data;
      })

      this.apiService.innerJoinArtistTable().subscribe(res=>{
        this.artistTableData = res.data;
        console.log(this.artistTableData);
        // console.log("Artists rating data", this.userSongRatingsData);

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

        this.newArtistArray.map((item:any) => {
          let songID = item.artist_id;
          this.userArtistRatingsData.map((item2:any) => {
            let songID2 = item2.artist_id;
            if (songID === songID2) {
              item['artist_rating'] = item2.artist_rating;
              // console.log(item);
            }
          });

        },
        // this.dtTrigger1.next(),
        );
        console.log(this.newArtistArray)

        this.top10Artists = this.newArtistArray.sort((a:any, b:any) => b.average_rating-a.average_rating).slice(0,10);
        console.log("Top 10 artists", this.top10Artists)


      })


    })

  }

}
