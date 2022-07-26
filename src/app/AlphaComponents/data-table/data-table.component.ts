import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement !: DataTableDirective;
  // @Input('userID') userID : any;
  @Input('type') type: string = "";
  @Input('colData') colData: any = [];

  addRatingGroup = new FormGroup({
    "uid": new FormControl(''),
    "songid": new FormControl(''),
    "artistid": new FormControl(''),
    "rating": new FormControl(''),
  });

  dtTrigger: Subject<any> = new Subject<any>();

  userSongRatingsData : any = [];
  userID: any;
  baseDir: string = '';
  songTableData: any = [];
  newArray:any = [];
  chromeServerURL = 'http://127.0.0.1:8887/';
  cover_img: string = '';
  top10Songs:any = [];


  userArtistRatingsData : any = [];
  newArtistArray:any = [];
  top10Artists:any = [];
  artistTableData: any = [];
  profile_pic: string = '';
  title:string = "";

  constructor(private apiService: ApiserviceService,) { }

  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    destroy: true
  };

  render(){

    // // If we have multiple data tables in a single component..
    // this.dtElements.forEach((dtElement: DataTableDirective) => {
    //   dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //     dtInstance.destroy();
    //     this.ngOnInit();
    //   });
    // });


    // // If we have single data tables in a single component..
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{
      console.log("Render called")
      dtInstance.destroy();
      this.ngOnInit();
    })
  }


  onRatingChanged(rating: any, data?:any) {

    if(this.type == "songs"){
      this.addRatingGroup.patchValue({
        "uid": this.userID,
        "songid": data.song_id,
        "rating": rating
      })

      this.apiService.insertUserReferenceTable(this.addRatingGroup.value).subscribe(res=>{
        console.log("Inserted and updated user reference");
        this.render()
        this.apiService.calculateAndInsertAverageSongRating().subscribe(res=>{
        })
      })

    }

    else if(this.type == "artists"){
      console.log("Artist on Change called")
      this.addRatingGroup.patchValue({
        "uid": this.userID,
        "artistid": data.artist_id,
        "rating": rating
      })
      this.apiService.insertUserArtistReferenceTable(this.addRatingGroup.value).subscribe(res=>{
        console.log("Inserted and updated user reference artist");
        this.render()
        // window.location.reload()
        this.apiService.calculateAndInsertAverageArtistRating().subscribe(res=>{

        })
      })
    }




  }

  ngOnInit(): void {
    console.log("Type is:", this.type);
    this.userID = JSON.parse(localStorage.getItem("userID")!);
    console.log(this.userID);
    console.log(typeof(this.userID));
    let queryParams = new HttpParams();
    queryParams = queryParams.append("uid",this.userID);

    if(this.type == "songs"){
      this.title = "All Songs"
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
          this.dtTrigger.next(),
          );
          console.log(this.newArray)
          this.top10Songs = this.newArray.sort((a:any, b:any) => b.average_rating-a.average_rating).slice(0,10);
          console.log("Top 10 songs", this.top10Songs)
        })
      })
    }

    else if(this.type == "artists"){
      this.title = "All Artists"
      this.apiService.userArtistRatingDetails(queryParams).subscribe(res=>{
        this.userArtistRatingsData = res.data;
      })

      this.apiService.innerJoinArtistTable().subscribe(res=>{
        this.artistTableData = res.data;
        console.log(this.artistTableData);
        // console.log("Artists rating data", this.userSongRatingsData);

        this.newArray = this.artistTableData.reduce(
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

        this.newArray.forEach((element:any) => {
          // if using running the  node js application locally.
          this.profile_pic = element.profile_pic;
          var sub_string = this.profile_pic.substring(this.profile_pic.lastIndexOf("/") + 1, this.profile_pic.length)
          element.profile_pic = this.chromeServerURL + sub_string;

          // // if running the node js application from a server.
          // this.profile_pic = element.profile_pic;
          // var sub_string = this.profile_pic.substring(this.profile_pic.lastIndexOf("/") + 1, this.profile_pic.length)
          // element.profile_pic = this.baseDir + sub_string;

        });


        console.log(this.newArray);

        this.newArray.map((item:any) => {
          let songID = item.artist_id;
          this.userArtistRatingsData.map((item2:any) => {
            let songID2 = item2.artist_id;
            if (songID === songID2) {
              item['artist_rating'] = item2.artist_rating;
              // console.log(item);
            }
          });

        },
        this.dtTrigger.next(),
        );
        console.log(this.newArray)

        this.top10Artists = this.newArray.sort((a:any, b:any) => b.average_rating-a.average_rating).slice(0,10);
        console.log("Top 10 artists", this.top10Artists)


      })

    }

  }
}
