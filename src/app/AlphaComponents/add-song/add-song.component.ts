import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';
import { AddArtistComponent } from '../add-artist/add-artist.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddSongComponent implements OnInit {


  addSongGroup = new FormGroup({
    "songname": new FormControl('',Validators.required),
    "dateofrelease": new FormControl('', Validators.required),
    "artists": new FormControl('', Validators.required),
    "song_id": new FormControl(''),
    "cover_art": new FormControl(''),
  });

  constructor(private  dialog:  MatDialog, private apiService: ApiserviceService) { }

  dropdownList : any = [];
  selectedItems : any = [];
  itemsArray: any = [];
  dropdownSettings : IDropdownSettings = {};
  data:any;
  id:any;
  selectedFile !: File;
  selectedFileName : string = '';
  allArtists : any = [];
  formData =  new FormData();


  ngOnInit(): void {


    this.apiService.getBaseDirectory().subscribe(res=>{
      console.log(res);
    })
    this.apiService.getArtistName().subscribe(res =>{
      this.dropdownList = res.data;
      console.log("All artists name",this.dropdownList);
    })

    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Jeremiah' },
    //   { item_id: 2, item_text: '50 Cent' },
    //   { item_id: 3, item_text: 'Eminem' },
    //   { item_id: 4, item_text: 'Lil Wayne' },
    //   { item_id: 5, item_text: 'Bruno Mars' }
    // ];
    // this.selectedItems = [
    //   // { item_id: 3, item_text: 'Pune' },
    //   // { item_id: 4, item_text: 'Navsari' }
    // ];

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
    if(this.addSongGroup.valid){
      // Insert into song_base table
      // console.log("Before inserting base song",this.addSongGroup.value)
      this.formData.append("songname",this.addSongGroup.get("songname")?.value)
      this.formData.append("dateofrelease",this.addSongGroup.get("dateofrelease")?.value)
      this.formData.append("artists",this.addSongGroup.get("artists")?.value)

      console.log("Form data", this.formData.get("cover_image"));

      this.apiService.insertSongBaseTable(this.formData).subscribe(res=>{
        console.log(res);

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
    }
  }

  onFileSelected(event:any) {

    this.selectedFile = event.target.files[0];
    this.formData.append("cover_image", this.selectedFile, this.selectedFile.name)
    console.log(this.selectedFile)

    this.selectedFileName = this.selectedFile.name
    console.log(this.selectedFile.name);
  }

}
