import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, DoCheck {

  baseDir: string = '';
  songTableData: any = [];
  testURL: string = '';
  chromeServerURL = 'http://127.0.0.1:8887/';
  sanitizedUrl: any;
  cover_img: string = '';

  uniqueObject:any = {};
  newArray:any = [];


  constructor(private apiService: ApiserviceService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.apiService.getBaseDirectory().subscribe(res=>{
      this.baseDir = res.dir
      console.log(this.baseDir)
      this.apiService.innerJoinSongTable().subscribe(res=>{
        this.songTableData = res.data;
        console.log(this.songTableData);

        // Declare a new array
        // thisnewArray = [];

        // Declare an empty object
        // let uniqueObject = {};

        // Loop for the array elements
        for (let i in this.songTableData) {

            // Extract the title
            let objTitle = this.songTableData[i]['song_id'];

            // Use the title as the index
            this.uniqueObject[objTitle] = this.songTableData[i];
        }

        // Loop to push unique object into array
        for (let i in this.uniqueObject) {
            this.newArray.push(this.uniqueObject [i]);
        }

        console.log(this.newArray);

        this.cover_img = this.songTableData[0]?.cover_image;
        this.testURL = this.chromeServerURL + this.cover_img.substring(this.cover_img.lastIndexOf("/") + 1, this.cover_img.length)
        // this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.testURL);
        console.log(this.testURL)
      })
    })

  }

  ngAfterViewInit(): void {
  }

  ngDoCheck(): void {

  }


}
