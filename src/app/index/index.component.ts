import { Component, OnInit } from '@angular/core';
import { UrlService } from '../url.service';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
// eslint-disable-next-line no-unused-vars
export class IndexComponent implements OnInit {
  //products: any[] | undefined;
  // slides: any[] | undefined;
  //public imageUrls: SafeResourceUrl[] = [];
  public carousel: any[] | undefined;
  public product: any[] | undefined;

  constructor(
    public apiService: UrlService,
    private navCtrl: NavController,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public sharedService: SharedService,
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    // this.apiService.getProducts().subscribe((response: any) => {
    //   this.products = response;
    // });
    // this.apiService.getCarousel().subscribe((response: any) => {
    //   this.slides = response;
    // });
    // this.http.get<any[]>(this.apiService.carouselApi).subscribe((res: any) => {
    //   res.forEach((data: any) => {
    //     const safeImagePath = this.sanitizeLocalUrl(data.image_url);
    //      this.imageUrls.push(safeImagePath);
    //     //console.log(data);
    //   });
    // });
    this.http.get(this.apiService.carouselApi).subscribe((res: any) => {
      this.carousel = res;
    });
    this.http.get(this.apiService.productApi).subscribe((res: any) => {
      this.sharedService.product1Items = res.products;
      //console.log(this.product);
    });
  }
  goToSearchPage() {
    this.navCtrl.navigateForward('/search-page');
  }

  // private sanitizeLocalUrl(url: string): SafeResourceUrl {
  //   // 如果不是本地文件路径，则直接返回原始URL。
  //   if (!url.toLowerCase().startsWith('file://')) {
  //     return url;
  //   }

  //   // 将反斜杠转换为正斜杠，并去掉 "file://" 前缀。
  //   const normalizedUrl = url.replace(/\\/g, '/').replace(/^file:\/\//i, '');

  //   // 构建完整的URL字符串。
  //   const fullUrl = `file://${normalizedUrl}`;

  //   // 使用 DomSanitizer 服务将 URL 转换为 SafeUrl 类型。
  //   return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  // }
  viewProductDetails(productId: number) {
    if (!this.sharedService.isLoggedin) {
      this.presentLoginAlert();
    }
    // 使用Ionic导航组件跳转并传递参数
    this.navCtrl.navigateForward('/product-detail/' + productId);
  }
  async presentLoginAlert() {
    const alert = await this.alertController.create({
      header: '请先登录',
      message: '您需要登录才能继续操作。',
      buttons: [{
        text: '确定',
        handler: () => {
          this.router.navigate(['/user-login']);
        },
      },]
    });
    await alert.present();
  }
}
