import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';
import { AddArtistComponent } from '../add-artist/add-artist.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ViewportScroller } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddSongComponent implements OnInit {

  @ViewChild('myInput') myInputVariable!: ElementRef;


  addSongGroup = new FormGroup({
    "songname": new FormControl('',Validators.required),
    "dateofrelease": new FormControl('', Validators.required),
    "artists": new FormControl('', Validators.required),
    "song_id": new FormControl(''),
    "cover_art": new FormControl(''),
  });

  constructor(private  dialog:MatDialog, private apiService:ApiserviceService, private router:Router) { }

  dropdownList : any = [];
  selectedItems : any = [];
  itemsArray: any = [];
  dropdownSettings : IDropdownSettings = {};
  data:any;
  id:any;
  selectedFile !: File;
  selectedSongFile !: File;

  selectedFileName : string = '';
  selectedSongFileName : string = '';

  allArtists : any = [];
  formData =  new FormData();
  isUploaded:boolean = false;
  submit : boolean = false;

  ngOnInit(): void {

    console.log(this.selectedFile)
    this.apiService.getBaseDirectory().subscribe(res=>{
      console.log(res);
    })
    this.apiService.getArtistName().subscribe(res =>{
      this.dropdownList = res.data;
      console.log("All artists name",this.dropdownList);
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    this.itemsArray.push(item)
    console.log(this.itemsArray);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  addArtist(){
    console.log("Function Called");

    const dialogobj =
    this.dialog.open(AddArtistComponent,{data:{
      message: "Dialog Opened"
    },
    height : "auto",
    width : "450px",
  });

  dialogobj.afterClosed().subscribe(()=>{
    this.ngOnInit()
  })

  return dialogobj;

  }

  addSong(){
    this.submit = true;
    if(this.addSongGroup.valid){
      // Insert into song_base table
      // console.log("Before inserting base song",this.addSongGroup.value)
      this.formData.append("songname",this.addSongGroup.get("songname")?.value)
      this.formData.append("dateofrelease",this.addSongGroup.get("dateofrelease")?.value)
      this.formData.append("artists",this.addSongGroup.get("artists")?.value)

      console.log("Form data", this.formData.get("cover_image"));
      console.log("Form data", this.formData.get("song"));

      this.apiService.insertSongBaseTable(this.formData).subscribe(res=>{
        console.log(res);
        this.apiService.insertUserReferenceTable(this.formData).subscribe (res=>{

        })
        // Get the last inserted song_id
        this.apiService.getLastInsertedID().subscribe(res=>{
          this.data = res;
          this.id = this.data.data[0].id
          console.log("Last inserted ID is:",this.id);

          this.addSongGroup.patchValue({
            "song_id": this.id,
            "cover_art": this.selectedFile
          });

          console.log(this.addSongGroup.get("song_id")?.value)
          console.log(this.addSongGroup.get("artists")?.value)
          console.log("Cover art: ",this.addSongGroup.get("cover_art")?.value)
          // Insert into song_reference table
          console.log(this.addSongGroup.value)
          this.apiService.insertSongReferenceTable(this.addSongGroup.value).subscribe(res=>{
            console.log("Song reference table api called: ",res);

          })
        })

        this.apiService.insertArtistReferenceTable(this.addSongGroup.value).subscribe(res=>{
          console.log("artist reference table api called: ",res);
        })
      })
      console.log(this.addSongGroup.value)
      console.log(this.isUploaded)
      const dialogobj =
      this.dialog.open(PopupComponent,
        {data:{
          message: "Song Added successfully!"
        },
        height : "auto",
        width : "300px",
        disableClose: true
      });

      dialogobj.afterClosed().subscribe(()=>{
        this.addSongGroup.reset();
        window.location.reload();
      })
      return dialogobj;
    }
    else{
      return null
    }
  }

  onFileSelected(event:any) {
    console.log("Cover select triggered")
    this.selectedFile = event.target.files[0];
    this.formData.append("cover_image", this.selectedFile, this.selectedFile.name)
    console.log(this.selectedFile)

    this.selectedFileName = this.selectedFile.name
    console.log(this.selectedFile.name);

  }
  onSongSelected(event:any) {

    console.log("Song select triggered")
    this.selectedSongFile = event.target.files[0];
    this.formData.append("song_file", this.selectedSongFile, this.selectedSongFile.name)
    console.log(this.selectedSongFile)

    this.selectedSongFileName = this.selectedSongFile.name
    console.log(this.selectedSongFile.name);

  }

}
