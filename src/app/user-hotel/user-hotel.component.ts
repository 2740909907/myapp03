import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UrlService } from '../url.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-user-hotel',
  templateUrl: './user-hotel.component.html',
  styleUrls: ['./user-hotel.component.scss'],
})
export class UserHotelComponent implements OnInit {
  constructor(
    private nav: NavController,
    public apiService: UrlService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.gethotels()
  }
  goBack() {
    this.nav.back();
  }
  gethotels() {
    this.apiService
      .getuserhotel(this.sharedService.user_id)
      .subscribe((data: any) => {
        this.sharedService.hotelItems = data;
        console.log(this.sharedService.productItems);
      });
  }
}
