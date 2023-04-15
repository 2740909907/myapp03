import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-hotel-text',
  templateUrl: './hotel-text.component.html',
  styleUrls: ['./hotel-text.component.scss'],
})
export class HotelTextComponent implements OnInit {
  constructor(
    private router: Router,
    public sharedservice: SharedService,
    public apiService: UrlService
  ) {}
  hotelItem: any[] = [];
  ngOnInit() {
    this.gethotel();
  }
  dologout() {
    this.sharedservice.isAdminin = false;
    this.router.navigate(['/user-login']); // navigate to user login page
  }
  gethotel() {
    this.apiService.gethoteltext().subscribe((res: any) => {
      this.sharedservice.hotel1Items = res;
      console.log(this.sharedservice.hotel1Items);
    });
  }
}
