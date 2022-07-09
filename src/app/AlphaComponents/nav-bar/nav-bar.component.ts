import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  userID:any;

  constructor(public router: Router) {
    console.log("Constructor called")
  }


  ngOnInit(): void {
    this.userID = localStorage.getItem("userID");
    console.log("user id nav bar", this.userID)
  }

  logout(){
    localStorage.setItem("userID", "");
    this.userID = "";
    console.log(this.userID)
    this.router.navigate(['/login'])
  }

}
