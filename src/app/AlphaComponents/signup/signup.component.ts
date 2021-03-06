import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';
import { Md5 } from 'ts-md5';
import { PopupComponent } from '../popup/popup.component';

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

  signedUpUserID:any;
  allSongsIDs:any = [];

  constructor(private apiService: ApiserviceService,private  dialog:  MatDialog, private router:Router) { }

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
        // this.apiService.userSingupID().subscribe(res=>{
        //   this.signedUpUserID = res.data[0].id
        //   console.log("User signed up ID", this.signedUpUserID)
        //   // this.apiService.getSongBaseTable().subscribe(res=>{
        //   //   this.allSongsIDs = res.data;
        //   //   console.log("All songs IDs", this.allSongsIDs)
        //   // })
        // })
        if(res){
          console.log("Popup called")
          const dialogobj =
          this.dialog.open(PopupComponent,
            {data:{
              message: "Sign up successful!"
            },
            height : "auto",
            width : "300px",
            disableClose: true
          });

          dialogobj.afterClosed().subscribe(()=>{
            this.router.navigate(['/login'])
          })
          return dialogobj;

        }
        else{
          return null
        }
      })
    }
  }





}
