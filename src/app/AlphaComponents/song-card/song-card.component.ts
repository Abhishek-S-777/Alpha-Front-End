import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit {

  @Input('top10Songs') top10Songs:any = [];

  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
  }

}
