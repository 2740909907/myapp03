import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-text-change',
  templateUrl: './text-change.component.html',
  styleUrls: ['./text-change.component.scss'],
})
export class TextChangeComponent implements OnInit {
  constructor(
    private router: Router,
    private sharedservice: SharedService,
    public apiService: UrlService
  ) {}

  ngOnInit() {}
  dologout() {
    this.sharedservice.isAdminin = false;
    this.router.navigate(['/user-login']); // navigate to user login page
  }
}
