import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    public sharedService: SharedService,
    public alertController: AlertController,
    private router: Router
  ) {}
  //const loginBtn = document.getElementById('login-btn');
  //title: any;
  //title='登录';
  loggedin = this.sharedService.isLoggedin;
  ngOnInit() {}
  cartlist() {
    if (!this.sharedService.isLoggedin) {
      this.presentLoginAlert();
      return;
    }
  }
  async presentLoginAlert() {
    const alert = await this.alertController.create({
      header: '请先登录',
      message: '您需要登录才能继续操作。',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.router.navigate(['/user-login']);
          },
        },
      ],
    });
    await alert.present();
  }
}
