import { Component, Inject, OnInit, Optional } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {

  constructor(@Optional() private  dialogRef:  MatDialogRef<AddArtistComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit(): void {
  }

}
