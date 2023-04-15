import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UrlService } from '../url.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss'],
})
export class UserProductComponent implements OnInit {
  constructor(
    private nav: NavController,
    public apiService: UrlService,
    public sharedService: SharedService
  ) {}
  cartItems: any[] = [];
  ngOnInit() {
    this.getproducts();
  }
  goBack() {
    this.nav.back();
  }
  getproducts() {
    this.apiService
      .getusertext(this.sharedService.user_id)
      .subscribe((data: any) => {
        this.sharedService.productItems = data;
        console.log(this.sharedService.productItems);
      });
  }
}
