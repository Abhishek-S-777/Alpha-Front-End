import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddArtistComponent } from '../add-artist/add-artist.component';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  constructor(private  dialog:  MatDialog) { }

  ngOnInit(): void {

  }

  addArtist(){
    console.log("Function Called");
    this.dialog.open(AddArtistComponent,{data:{
      message: "Dialog Opened"
    },
    height : "auto",
    width : "450px",
  });
  }

}
