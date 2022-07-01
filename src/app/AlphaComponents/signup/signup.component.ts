import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  signupGroup = new FormGroup({
    "uname": new FormControl('',Validators.required),
    "uemail": new FormControl('', Validators.required),
    "upwd": new FormControl('', Validators.required),
  });

  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
  }

  signup(){
    if(this.signupGroup.valid){
      let pwdHash = Md5.hashStr(this.signupGroup.get("upwd")?.value)
    
      this.signupGroup.patchValue({
        "upwd": pwdHash,
      })
      console.log(this.signupGroup.value)
      this.apiService.userSignup(this.signupGroup.value).subscribe(res=>{
        console.log("User signed up successfully!")
      })
    }
  }



}
