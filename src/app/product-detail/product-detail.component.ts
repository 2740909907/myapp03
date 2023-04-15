import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from '../product';
import { CartService } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';
import { SharedService } from '../services/shared.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  router: any;
  constructor(
    public apiService: UrlService,
    public nav: NavController,
    private cartService: CartService,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sharedService: SharedService,
    private datePipe: DatePipe
  ) {}
  product: any;
  hotels: any;
  quantity = 1;
  cartItems: any[] = [];
  commentItems: any[] = [];
  message: any;
  ngOnInit() {
    this.route.params.subscribe((data) => {
      console.log(data);
      let pid = data['pid'];
      console.log(pid);
      this.apiService.getProductDetails(pid).subscribe((res) => {
        this.product = res;
        console.log(this.product);
        this.getComment();
      });
      this.apiService.getHotel1(pid).subscribe((res) => {
        this.hotels = res;
        //console.log(this.hotels[0].hotel_id);
      });
    });

    //this.getCartItems();
  }
  addComment() {
    this.apiService
      .postcomment(
        this.product.product_id,
        this.sharedService.user_id,
        this.message
      )
      .subscribe(() => {
        //console.log(res);
        this.getComment();
      });
      this.message = '';
  }
  getComment() {
    this.apiService
      .getcomment(this.product.product_id)
      .subscribe((data: any) => {
        this.commentItems = data[0];
        console.log(this.commentItems);
      });
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
    // 请求景点详情数据
    // this.http.get(`http://localhost:3000/${attractionId}/api/product-details`).subscribe((data: any) => {
    //   this.product = data;
    //   console.log(this.product);
    // });
  }
  addProductToCart(productId: number, quantity: any) {
    // this.apiService.postCart(productId, quantity).subscribe((result) => {
    //   console.log(result);
    // });
    console.log(this.product.product_id);
    console.log('quantity:', quantity);
    // let c = this.apiService.postCart(this.product.product_id, quantity);
    // c.subscribe((result) => {
    //   console.log('response:', result);
    // });
    console.log(this.sharedService.user_id);
    this.apiService
      .postCartItem(this.sharedService.user_id, productId, quantity)
      .subscribe(() => {
        //console.log(res);
        // this.apiService
        //   .getCartItem(this.sharedService.user_id)
        //   .subscribe(() => {
        //     //this.cartItems = data[0];
        //     //console.log(data[0]);
        //     //console.log(this.cartItems);
        //     //this.calculateTotal();

        //   });
        this.getCartItems();
      });
    //console.log();
    this.presentAlert();
  }
  viewHotelDetails(hotelId: any) {
    // 导航到酒店详情页面
    this.nav.navigateForward('/hotel/' + hotelId);
  }
  goBack() {
    this.nav.back();
  }
  // products: Product[] = [
  //   {
  //     id: 1,
  //     name: '杭州动物园',
  //     price: 64,
  //     image: '../../assets/liebiao/3.jpg',
  //     quantity: 1,
  //     selected: false
  //   }
  // ];
  // ionViewWillEnter() {
  //   // 获取传递的景点 ID 参数

  // }
  // addToCart() {
  //   //this.cartService.addToCart(product);
  //   this.presentAlert();
  // }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '加入购物车',
      message: '商品已加入购物车！',
      buttons: ['确定'],
    });
    await alert.present();
  }
}
