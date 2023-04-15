import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UrlService } from '../url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  constructor(
    private nav: NavController,
    public apiService: UrlService,
    public alertController: AlertController,
    private router: Router
  ) {}
  uname: any;
  upwd: any;
  email: any;
  ngOnInit() {}
  goBack() {
    this.nav.back();
  }
  register() {
    this.apiService.postRegister(this.uname, this.upwd, this.email).subscribe(
      (res) => {
        console.log(res);
        this.presentAlert();
      },
      (error) => {
        console.error(error);
        //alert("登录失败");
        this.presentAlert2();
      }
    );
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '注册',
      message: '注册成功！',
      buttons: [{
        text: '确定',
        handler: () => {
          this.router.navigate(['/user-login']);
        },
      },],
    });
    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: '注册',
      message: '用户名或邮箱重复，请重新输入',
      buttons: ['确定'],
    });
    await alert.present();
  }
}
