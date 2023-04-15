import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UrlService } from '../url.service';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  uname: any;
  upwd: any;
  cartItems: any[] = [];
  isUser = true; // 默认用户勾选中
  isAdmin = false;
  adminName = 'admin'; // 管理员的用户名
  adminPwd = '123456'; // 管理员的密码
  constructor(
    private nav: NavController,
    public apiService: UrlService,
    public alertController: AlertController,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.getCartItems();
  }
  toggleCheckbox() {
    if (this.isAdmin) {
      this.isUser = false;
    } else {
      this.isUser = true;
    }
  }
  getCartItems() {
    this.apiService
      .getCartItem(this.sharedService.user_id)
      .subscribe((data: any) => {
        this.sharedService.cartItems = data[0];
        console.log(this.sharedService.cartItems);
        //console.log(this.cartItems);
        //this.calculateTotal();
      });
  }
  doLogin() {
    if (this.isAdmin) {
      if (this.uname !== this.adminName || this.upwd !== this.adminPwd) {
        //this.sharedService.isAdminin = false;
        this.presentAlert3();
        return;
      }
      this.sharedService.isAdminin = true;
      this.presentAlert4();
      this.uname = '';
      this.upwd = '';
      return;
    }
    this.apiService.postLogin(this.uname, this.upwd).subscribe(
      (res: any) => {
        console.log(res);
        this.sharedService.isLoggedin = true;
        this.sharedService.user_id = res[0].user_id;
        console.log(this.sharedService.user_id);
        this.presentAlert();
        this.getCartItems();
        this.uname = '';
        this.upwd = '';
      },
      (error) => {
        console.error(error);
        //alert("登录失败");
        this.presentAlert2();
      }
    );

    //console.log(this.uname)
  }
  goBack() {
    this.nav.back();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '登录',
      message: '登录成功！',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.router.navigate(['/user-text']);
          },
        },
      ],
    });
    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: '登录',
      message: '用户名或密码错误，请重新输入',
      buttons: ['确定'],
    });
    await alert.present();
  }
  async presentAlert3() {
    const alert = await this.alertController.create({
      header: '登录',
      message: '管理员账户或密码错误，请重新输入',
      buttons: ['确定'],
    });
    await alert.present();
  }
  async presentAlert4() {
    const alert = await this.alertController.create({
      header: '登录',
      message: '管理员登录成功',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.router.navigate(['/index2']);
          },
        },
      ],
    });
    await alert.present();
  }
}
