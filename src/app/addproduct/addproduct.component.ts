import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent implements OnInit {
  constructor(
    private router: Router,
    private sharedservice: SharedService,
    public apiService: UrlService,
    private http: HttpClient,
    public alertController: AlertController,
    private nav: NavController
  ) {}

  productid: any;
  title: any;
  image1: any;
  image2: any;
  image3: any;
  title1: any;
  title2: any;
  price: any;
  content1: any;
  content2: any;
  phone: any;
  hotel1ID: any;
  hotel1name: any;
  hotel1a: any;
  hotel1address: any;
  hotel1phone: any;
  hotel1picture: any;
  hotel1price1: any;
  hotel1price2: any;
  hotel1price3: any;
  hotel2ID: any;
  hotel2name: any;
  hotel2a: any;
  hotel2address: any;
  hotel2phone: any;
  hotel2picture: any;
  hotel2price1: any;
  hotel2price2: any;
  hotel2price3: any;
  hotel3ID: any;
  hotel3name: any;
  hotel3a: any;
  hotel3address: any;
  hotel3phone: any;
  hotel3picture: any;
  hotel3price1: any;
  hotel3price2: any;
  hotel3price3: any;
  productItem: any[] = [];
  // public hotelItem=[{hotel1name: this.hotel1name,this.hotel}];

  ngOnInit() {
    this.getproduct();
    this.gethotel();
    this.getshortproduct();
  }
  goBack() {
    this.nav.back();
  }
  dologout() {
    this.sharedservice.isAdminin = false;
    this.router.navigate(['/user-login']); // navigate to user login page
  }
  getproduct() {
    this.apiService.getproducttext().subscribe((res: any) => {
      this.sharedservice.productdetailItems = res;
      console.log(this.sharedservice.productdetailItems);
    });
  }
  getshortproduct() {
    this.http.get(this.apiService.productApi).subscribe((res: any) => {
      this.sharedservice.product1Items = res;
      console.log(this.sharedservice.product1Items);
    });
  }
  gethotel() {
    this.apiService.gethoteltext().subscribe((res: any) => {
      this.sharedservice.hotel1Items = res;
      console.log(this.sharedservice.hotel1Items);
    });
  }
  addproduct() {
    this.apiService
      .postproductdetail(
        this.productid,
        this.image1,
        this.image2,
        this.image3,
        this.title,
        this.title1,
        this.title2,
        this.price,
        this.content1,
        this.content2,
        this.phone,
        this.hotel1name,
        this.hotel1a,
        this.hotel1price1,
        this.hotel2name,
        this.hotel2a,
        this.hotel2price1,
        this.hotel3name,
        this.hotel3a,
        this.hotel3price1,
        this.hotel1picture,
        this.hotel2picture,
        this.hotel3picture
      )
      .subscribe(() => {
        this.getproduct();
      });
    this.apiService
      .postadminproduct(this.title, this.title2, this.price, this.image1)
      .subscribe(() => {
        this.getshortproduct();
      });
    this.apiService
      .postadminhotel(
        this.hotel1name,
        this.hotel1address,
        this.hotel1phone,
        this.hotel1picture,
        this.hotel1price1,
        this.hotel1price2,
        this.hotel1price3
      )
      .subscribe(() => {
        this.gethotel();
      });
    this.apiService
      .postadminhotel(
        this.hotel2name,
        this.hotel2address,
        this.hotel2phone,
        this.hotel2picture,
        this.hotel2price1,
        this.hotel2price2,
        this.hotel2price3
      )
      .subscribe(() => {
        this.gethotel();
      });
    this.apiService
      .postadminhotel(
        this.hotel3name,
        this.hotel3address,
        this.hotel3phone,
        this.hotel3picture,
        this.hotel3price1,
        this.hotel3price2,
        this.hotel3price3
      )
      .subscribe(() => {
        this.gethotel();
      });
    this.apiService.postproducthotel(this.productid, this.hotel1ID).subscribe((res)=>{
      console.log(res)
    });
    this.apiService.postproducthotel(this.productid, this.hotel2ID).subscribe((res)=>{
      console.log(res)
    });
    this.apiService.postproducthotel(this.productid, this.hotel3ID).subscribe((res)=>{
      console.log(res)
    });

    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '提交成功！',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.change();
          },
        },
      ],
    });
    await alert.present();
  }

  change() {
  this.productid='';
  this.title='';
  this.image1='';
  this.image2='';
  this.image3='';
  this.title1='';
  this.title2='';
  this.price='';
  this.content1='';
  this.content2='';
  this.phone='';
  this.hotel1ID='';
  this.hotel1name='';
  this.hotel1a='';
  this.hotel1address='';
  this.hotel1phone='';
  this.hotel1picture='';
  this.hotel1price1='';
  this.hotel1price2='';
  this.hotel1price3='';
  this.hotel2ID='';
  this.hotel2name='';
  this.hotel2a='';
  this.hotel2address='';
  this.hotel2phone='';
  this.hotel2picture='';
  this.hotel2price1='';
  this.hotel2price2='';
  this.hotel2price3='';
  this.hotel3ID='';
  this.hotel3name='';
  this.hotel3a='';
  this.hotel3address='';
  this.hotel3phone='';
  this.hotel3picture='';
  this.hotel3price1='';
  this.hotel3price2='';
  this.hotel3price3='';
  }
}
