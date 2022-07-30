import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  detailsData: any;
  detailsField: any;
  detailsType: string = '';
  type:string = 'detailsSong';


  constructor(private apiService: ApiserviceService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.detailsData = JSON.parse(localStorage.getItem("details")!) ;
    this.detailsField = JSON.parse(localStorage.getItem("field")!) ;
    this.detailsType = this.route.snapshot.paramMap.get('type')!;
    // this.detailsData = this.apiService.getDetailsData();
    console.log("Details data: ",this.detailsData);
    console.log("detailsField: ",this.detailsField);
    console.log("detailsType: ",this.detailsType);

    
  }

}
