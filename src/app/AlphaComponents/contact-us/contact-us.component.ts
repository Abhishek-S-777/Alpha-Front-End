import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactUsGroup = new FormGroup({
    "uname": new FormControl('',Validators.required),
    "uemail": new FormControl('', Validators.required),
    "umessage": new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  contactUs(){

  }

}
