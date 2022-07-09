import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {

  data1:any;
  id:any;
  selectedFile !: File;
  selectedFileName : string = '';
  formData =  new FormData();

  addArtistGroup = new FormGroup({
    "artistname": new FormControl('',Validators.required),
    "dateofbirth": new FormControl('', Validators.required),
    "biography": new FormControl('', Validators.required),
    // "profile_pic": new FormControl(''),
  });

  constructor(private  dialog:MatDialog, @Optional() private  dialogRef:  MatDialogRef<AddArtistComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any, private apiService: ApiserviceService) { }

  ngOnInit(): void {
  }


  onFileSelected(event:any) {

    this.selectedFile = event.target.files[0];
    this.formData.append("profile_pic", this.selectedFile, this.selectedFile.name)
    console.log(this.selectedFile)
    console.log("Form data", this.formData.get("profile_pic"));

    this.selectedFileName = this.selectedFile.name
    console.log(this.selectedFile.name);
  }


  addArtist(){
    if(this.addArtistGroup.valid){
      // Insert into song_base table
      // console.log("Before inserting base song",this.addArtistGroup.value)
      this.formData.append("artistname",this.addArtistGroup.get("artistname")?.value)
      this.formData.append("dateofbirth",this.addArtistGroup.get("dateofbirth")?.value)
      this.formData.append("biography",this.addArtistGroup.get("biography")?.value)

      console.log(this.formData.get('artistname'))

      this.apiService.insertArtistBaseTable(this.formData).subscribe(res=>{
        console.log(res);
        this.dialogRef.close()
        const dialogobj =
        this.dialog.open(PopupComponent,
          {data:{
            message: "Artist Added successfully!"
          },
          height : "auto",
          width : "300px",
          disableClose: true
        });

        dialogobj.afterClosed().subscribe(()=>{

        })
        return dialogobj;

        // // Get the last inserted song_id
        // this.apiService.getLastInsertedIDArtist().subscribe(res=>{
        //   this.data = res;
        //   this.id = this.data.data[0].id
        //   console.log("Last inserted ID is:",this.id);

        //   this.addArtistGroup.patchValue({
        //     "song_id": this.id,
        //     "cover_art": this.selectedFile
        //   });



        //   console.log(this.addArtistGroup.get("song_id")?.value)
        //   console.log(this.addArtistGroup.get("artists")?.value)
        //   console.log("Cover art: ",this.addArtistGroup.get("cover_art")?.value)
        //   // Insert into song_reference table
        //   console.log(this.addArtistGroup.value)
        //   this.apiService.insertArtistReferenceTable(this.addArtistGroup.value).subscribe(res=>{
        //     console.log("reference table api called: ",res);
        //   })
        // })
      })
      console.log(this.addArtistGroup.value)

    }
  }

}
