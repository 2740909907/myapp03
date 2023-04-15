import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../url.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
  // constructor(private nav: NavController) { }
  hotelId: any;
  hotel: any;
  ngOnInit() {
    this.route.params.subscribe((data) => {
      //console.log(data);
      let pid = data['pid'];
      console.log(pid);
      this.apiService.getHotel2(pid).subscribe((res: any) => {
        this.hotel = res;
        //console.log(this.hotel);
      });
    });
  }
  // goBack() {
  //   this.nav.back()
  // }
  checkinTime: any;
  checkoutTime: any;
  minDate: string;
  maxDate: string;
  roomType: any;
  totalNights: any;
  totalPrice: any;
  constructor(
    private nav: NavController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public apiService: UrlService,
    public sharedService: SharedService
  ) {
    // 设置日期时间选择器的最小和最大日期时间值
    this.minDate = new Date().toISOString();
    this.maxDate = new Date('2023-04-30').toISOString();
  }
  goBack() {
    this.nav.back();
  }
  onCheckinTimeChange(event: any) {
    // 计算入住天数
    const checkinDate = new Date(this.checkinTime);
    const checkoutDate = new Date(this.checkoutTime);
    this.totalNights = Math.round(
      (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24)
    );
    // 计算总价
    this.totalPrice = this.totalNights * this.getRoomPrice(this.roomType);
  }
  onCheckoutTimeChange(event: any) {
    // 计算入住天数
    const checkinDate = new Date(this.checkinTime);
    const checkoutDate = new Date(this.checkoutTime);
    this.totalNights = Math.round(
      (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24)
    );
    // 计算总价
    this.totalPrice = this.totalNights * this.getRoomPrice(this.roomType);
  }
  onReserveClick() {
    // 处理预订按钮的点击事件
    // alert(
    //   `您已成功预订 ${this.roomType}，共 ${this.totalNights} 晚，总价为 ${this.totalPrice} 元。`
    // );
    this.presentAlert();
  }
  private getRoomPrice(roomType: string): number {
    // 根据房型获取价格
    // 这里简单地返回一个固定的价格，实际应用中应该从后端获取价格信息
    switch (roomType) {
      case '单人房':
        return this.hotel.price1;
      case '双人房':
        return this.hotel.price2;
      case '家庭房':
        return this.hotel.price3;
      default:
        return 0;
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '是否要预订该酒店客房',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            console.log('再次弹出提示框！');
            this.showNextAlert(); // 调用 showALert 函数，实现递归
          },
        },
      ],
    });
    await alert.present();
  }
  async showNextAlert() {
    const alert = await this.alertController.create({
      header: '提示',
      message: `您已成功预订 ${this.roomType}，共 ${this.totalNights} 晚，总价为 ${this.totalPrice} 元。`,
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('再次弹出提示框！');
            this.apiService
              .posthotel(
                this.sharedService.user_id,
                this.hotel.hotel_name,
                this.roomType,
                this.totalPrice,
                this.totalNights
              )
              .subscribe(() => {
                //console.log(res);
                this.apiService
                  .getuserhotel(this.sharedService.user_id)
                  .subscribe((data: any) => {
                    this.sharedService.hotelItems = data;
                    console.log(this.sharedService.hotelItems);
                  });
              });
          },
        },
      ],
    });
    await alert.present();
  }
}
