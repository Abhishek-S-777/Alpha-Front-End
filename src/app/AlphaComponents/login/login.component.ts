import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiserviceService } from 'src/app/AlphaServices/apiservice.service';
import { Md5 } from 'ts-md5';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginGroup = new FormGroup({
    "uemail": new FormControl('',Validators.required),
    "upwd": new FormControl('', Validators.required),
  });

  userData : any;
  pwdMD5Hash:any;

  constructor(private apiService: ApiserviceService,private  dialog:  MatDialog) { }

  ngOnInit(): void {
  }

  login(){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email",this.loginGroup.get("uemail")?.value);
    this.apiService.userLogin(queryParams).subscribe(res =>{
      this.userData = res.data[0];
      console.log(this.userData);
      this.pwdMD5Hash = Md5.hashStr(this.loginGroup.get("upwd")?.value)
      if(this.pwdMD5Hash == this.userData.upassword){

        const dialogobj =
          this.dialog.open(PopupComponent,{data:{
            message: "Dialog Opened"
          },
          height : "auto",
          width : "450px",
        });

        dialogobj.afterClosed().subscribe(()=>{
          // this.ngOnInit()
        })

        return dialogobj;
        console.log("Login Successful");
      }
      else{
        console.log("Login Failed, incorrect credentials");
        return null
      }
    })

  }

  // popup(){
  //   console.log("Popup called")
  //   const dialogobj =
  //   this.dialog.open(PopupComponent,{data:{
  //     message: "Dialog Opened"
  //   },
  //   height : "auto",
  //   width : "450px",
  // });

  // dialogobj.afterClosed().subscribe(()=>{
  //   // this.ngOnInit()
  // })

  // return dialogobj;
  // }

}
