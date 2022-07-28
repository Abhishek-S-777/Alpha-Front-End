import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    "uemail": new FormControl('',[Validators.required, Validators.email]),
    "upwd": new FormControl('', Validators.required),
  });

  userData : any;
  pwdMD5Hash:any;
  userId:any;
  submit: boolean = false;

  constructor(private apiService: ApiserviceService,private  dialog:  MatDialog, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.submit = true;
    if(this.loginGroup.valid){
      let queryParams = new HttpParams();
      queryParams = queryParams.append("email",this.loginGroup.get("uemail")?.value);
      this.apiService.userLogin(queryParams).subscribe(res =>{
        this.userData = res.data[0];
        console.log(this.userData);
        this.pwdMD5Hash = Md5.hashStr(this.loginGroup.get("upwd")?.value)
        if(this.pwdMD5Hash == this.userData.upassword){
          console.log(typeof(this.userData.userid))
          localStorage.setItem("userID", this.userData.userid);
          // console.log("user ID:", this.userId)
        const dialogobj =
        this.dialog.open(PopupComponent,
          {
            data:
            {
              message: "Login Successful!"
            },
          height : "auto",
          width : "275px",
          disableClose: true
        });

          dialogobj.afterClosed().subscribe(()=>{
            this.router.navigate(['/']).then(()=>{
              window.location.reload();
            })
          })
          return dialogobj;
        }
        else{
          const dialogobj =
          this.dialog.open(PopupComponent,
            {
              data:
              {
                message: "Login failed! check credentials"
              },
            height : "auto",
            width : "350px",
            disableClose: true
          });

            // dialogobj.afterClosed().subscribe(()=>{
            //   this.router.navigate(['/']).then(()=>{
            //     window.location.reload();
            //   })
            // })
            return dialogobj;
          // console.log("Login Failed, incorrect credentials");
          // return null
        }
      })
    }


  }



}
