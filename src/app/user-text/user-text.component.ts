import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-text',
  templateUrl: './user-text.component.html',
  styleUrls: ['./user-text.component.scss'],
})
export class UserTextComponent implements OnInit {
  constructor(private sharedservice: SharedService, private router: Router) {}

  ngOnInit() {}
  dologout() {
    this.sharedservice.isLoggedin = false; // set isloggedin to false in sharedservice
    this.router.navigate(['/user-login']); // navigate to user login page
  }
}
