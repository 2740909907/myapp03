import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.scss'],
})
export class DeleteproductComponent implements OnInit {
  productid: any;
  constructor(
    private router: Router,
    private sharedservice: SharedService,
    public apiService: UrlService,
    private http: HttpClient,
    public alertController: AlertController,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.getproduct();
    this.getshortproduct();
  }
  goBack() {
    this.nav.back();
  }
  dologout() {
    this.sharedservice.isAdminin = false;
    this.router.navigate(['/user-login']); // navigate to user login page
  }
  deleteproduct() {
    this.presentAlert();
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
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '请确认是否删除！',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
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
    this.apiService.deleteproductdetail(this.productid).subscribe(() => {
      this.getproduct();
      this.getshortproduct();
    });
    // this.apiService.deleteproduct(this.productid).subscribe(() => {
    //   this.getshortproduct();
    // });
    this.productid = '';
  }
}
